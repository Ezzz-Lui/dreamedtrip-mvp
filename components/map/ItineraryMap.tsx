"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Itinerary, Stop } from "@/lib/types/itinerary";
import { cn } from "@/lib/utils";

import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox GL expects a concrete color (hex/rgb), not CSS variables
const ROUTE_COLOR = "#2563eb";
const MARKER_COLOR = "#2563eb";
const MARKER_COLOR_ACTIVE = "#1d4ed8";

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
        style: "mapbox://styles/mapbox/light-v11",
        center,
        zoom: 12,
      });

      map.addControl(
        new mapbox.NavigationControl(),
        "top-right"
      );

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
            "line-width": 4,
          },
        });

        const bounds = getBounds(coords);
        if (bounds && coords.length > 1) {
          mapInstance.fitBounds(bounds, { padding: 60, maxZoom: 14 });
        }

        itinerary.days.forEach((day) => {
          day.stops.forEach((stop, i) => {
            const el = document.createElement("div");
            el.className = "map-marker";
            el.style.width = "24px";
            el.style.height = "24px";
            el.style.borderRadius = "50%";
            el.style.backgroundColor =
              selectedStopId === stop.placeId ? MARKER_COLOR_ACTIVE : MARKER_COLOR;
            el.style.border = "2px solid white";
            el.style.cursor = "pointer";
            el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
            el.title = stop.name;

            const popup = new mapbox.Popup({
              offset: 20,
              closeButton: true,
              closeOnClick: false,
            }).setHTML(
              `<div class="p-2 min-w-[140px]">
                <p class="font-semibold text-sm">${stop.name}</p>
                <p class="text-xs text-muted-foreground">${stop.type}</p>
                ${stop.price != null ? `<p class="text-xs mt-1">~$${stop.price}</p>` : ""}
                ${stop.duration != null ? `<p class="text-xs">${stop.duration} min</p>` : ""}
              </div>`
            );

            el.addEventListener("click", () => {
              onStopSelect?.(stop);
            });

            new mapbox.Marker({
              element: el,
            })
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
      className={cn("w-full h-full min-h-[300px] rounded-lg overflow-hidden", className)}
    />
  );
}
