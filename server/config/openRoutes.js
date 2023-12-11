/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const axios = require("axios");
const polyline = require("@mapbox/polyline");
const { MapRoutes } = require("../models");

async function getOpenRouteServiceRoute(latStart, lonStart, latEnd, lonEnd, purchaseGroupId) {
  const apiKey = process.env.TOKEN_OPEN_ROUTES;

  try {
    const existingRoute = await MapRoutes.findOne({
      where: {
        purchase_group_id: purchaseGroupId,
      },
    });

    if (existingRoute) {
      throw new Error("Route for this purchase_group_id already exists");
    }
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [
          [lonStart, latStart],
          [lonEnd, latEnd],
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const route = response.data.routes[0];

    if (!route || !route.geometry) {
      throw new Error("Invalid route data");
    }

    const decodedGeometry = polyline.decode(route.geometry);

    const routeData = decodedGeometry.map((coord) => [coord[0], coord[1]]);

    await MapRoutes.create({
      purchase_group_id: purchaseGroupId,
      routes: JSON.stringify(routeData), // Simpan sebagai string JSON
    });

    return routeData;
  } catch (error) {
    console.error("Error getting route from OpenRouteService:", error);
    throw error;
  }
}

module.exports = { getOpenRouteServiceRoute };
