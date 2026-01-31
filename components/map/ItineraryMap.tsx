"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Itinerary, Stop } from "@/lib/types/itinerary";
import { cn } from "@/lib/utils";

import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox GL expects concrete colors (hex). Travel-oriented palette: teal/emerald
const ROUTE_COLOR = "#0d9488";
const ROUTE_GLOW_COLOR = "rgba(13, 148, 136, 0.25)";
const MARKER_BG = "#0d9488";
const MARKER_BG_ACTIVE = "#0f766e";
const MARKER_TEXT = "#ffffff";

function escapeHtml(text: string): string {
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) {
    div.textContent = text;
    return div.innerHTML;
  }
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ItineraryMapProps {
  itinerary: Itinerary;
  className?: string;
  selectedStopId?: string | null;
  onStopSelect?: (stop: Stop) => void;
}

function getRouteCoordinates(itinerary: Itinerary): [number, number][] {
  const coords: [number, number][] = [];
  for (const day of itinerary.days) {
    for (const stop of day.stops) {
      coords.push([stop.lng, stop.lat]);
    }
  }
  return coords;
}

function getBounds(coords: [number, number][]): [[number, number], [number, number]] | null {
  if (coords.length === 0) return null;
  let minLng = coords[0][0];
  let maxLng = coords[0][0];
  let minLat = coords[0][1];
  let maxLat = coords[0][1];
  for (const [lng, lat] of coords) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
  const padding = 0.01;
  return [
    [minLng - padding, minLat - padding],
    [maxLng + padding, maxLat + padding],
  ];
}

export function ItineraryMap({
  itinerary,
  className,
  selectedStopId,
  onStopSelect,
}: ItineraryMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const mountedRef = useRef(true);

  const initMap = useCallback(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const container = containerRef.current;
    if (!token || !container) return;

    // Ensure container is empty (Mapbox requirement)
    container.innerHTML = "";

    import("mapbox-gl").then((mapboxgl) => {
      if (!mountedRef.current || !containerRef.current) return;
      const container = containerRef.current;
      if (container.children.length > 0) return;

      const mapbox = mapboxgl.default;
      mapbox.accessToken = token;

      const coords = getRouteCoordinates(itinerary);
      const center: [number, number] =
        coords.length > 0
          ? [coords[0][0], coords[0][1]]
          : [-3.7038, 40.4168];

      const map = new mapbox.Map({
        container,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center,
        zoom: 12,
        attributionControl: false,
      });
      map.addControl(new mapbox.NavigationControl({ showCompass: true }), "top-right");
      map.addControl(new mapbox.ScaleControl({ unit: "metric" }), "bottom-left");

      map.on("load", () => {
        const mapInstance = map;

        mapInstance.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        });

        // Glow layer: wider, semi-transparent for depth
        mapInstance.addLayer({
          id: "route-glow",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": ROUTE_GLOW_COLOR,
            "line-width": 12,
          },
        });

        // Main route line
        mapInstance.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": ROUTE_COLOR,
            "line-width": 5,
          },
        });

        const bounds = getBounds(coords);
        if (bounds && coords.length > 1) {
          mapInstance.fitBounds(bounds, { padding: 60, maxZoom: 14 });
        }

        let stopIndex = 0;
        itinerary.days.forEach((day) => {
          day.stops.forEach((stop) => {
            stopIndex += 1;
            const isActive = selectedStopId === stop.placeId;
            const el = document.createElement("div");
            el.className = "dt-map-marker";
            el.setAttribute("aria-label", `Stop ${stopIndex}: ${stop.name}`);
            el.style.cssText = `
              width: 28px; height: 28px;
              border-radius: 50%;
              background: ${isActive ? MARKER_BG_ACTIVE : MARKER_BG};
              border: 2px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              cursor: pointer;
              display: flex; align-items: center; justify-content: center;
              font-size: 12px; font-weight: 600; color: ${MARKER_TEXT};
              font-family: var(--font-geist-sans), system-ui, sans-serif;
              transition: box-shadow 0.15s ease, filter 0.15s ease;
            `;
            el.textContent = String(stopIndex);
            el.title = stop.name;

            el.addEventListener("mouseenter", () => {
              el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.3)";
              el.style.filter = "brightness(1.1)";
            });
            el.addEventListener("mouseleave", () => {
              el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
              el.style.filter = "none";
            });
            el.addEventListener("click", () => onStopSelect?.(stop));

            const priceStr =
              stop.price != null ? `~$${stop.price}` : "";
            const durationStr =
              stop.duration != null ? `${stop.duration} min` : "";
            const metaParts = [priceStr, durationStr].filter(Boolean);

            const popup = new mapbox.Popup({
              offset: 25,
              closeButton: true,
              closeOnClick: false,
              className: "dt-itinerary-popup",
            }).setHTML(
              `<div class="dt-popup-title">${escapeHtml(stop.name)}</div>` +
                `<div class="dt-popup-type">${escapeHtml(stop.type)}</div>` +
                (metaParts.length
                  ? `<div class="dt-popup-meta">${metaParts.join(" · ")}</div>`
                  : "")
            );

            new mapbox.Marker({ element: el })
              .setLngLat([stop.lng, stop.lat])
              .setPopup(popup)
              .addTo(mapInstance);
          });
        });
      });

      mapRef.current = map;
    });
  }, [itinerary, selectedStopId, onStopSelect]);

  useEffect(() => {
    mountedRef.current = true;
    initMap();
    return () => {
      mountedRef.current = false;
      if (mapRef.current && typeof (mapRef.current as { remove: () => void }).remove === "function") {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
      const container = containerRef.current;
      if (container) container.innerHTML = "";
    };
  }, [initMap]);

  const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!hasToken) {
    return (
      <div
        className={cn(
          "flex min-h-[300px] w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground",
          className
        )}
      >
        Set NEXT_PUBLIC_MAPBOX_TOKEN to show the map.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-border shadow-md ring-1 ring-black/5",
        className
      )}
    />
  );
}
