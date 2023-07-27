// src/mocks/handlers.js

import { rest } from "msw";

export const handlers = [
  rest.get("https://90shop-api.vercel.app/products/GBP", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 100,
          brand: "brandA",
          title: "titleA",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
          freeShipping: true,
          newest: true,
          price: {
            value: 15,
            oldValue: 20,
            shipping: 2,
            currencyInfo: {
              locale: "en-GB",
              currencyCode: "GBP",
            },
          },
          imageURL: "https://90shop-api.vercel.app/images/TomyPocketGames.jpg",
          imageAlt: "Lorem ipsum dolor sit amet consectetur.",
          availableQuantity: 3,
        },
        {
          id: 101,
          brand: "brandB",
          title: "titleB",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
          freeShipping: true,
          newest: true,
          price: {
            value: 10,
            shipping: 2,
            currencyInfo: {
              locale: "en-GB",
              currencyCode: "GBP",
            },
          },
          imageURL: "https://90shop-api.vercel.app/images/Lego.jpg",
          imageAlt: "Lorem ipsum dolor sit amet consectetur.",
          availableQuantity: 15,
        },
        {
          id: 102,
          brand: "brandC",
          title: "titleC",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
          freeShipping: false,
          newest: false,
          price: {
            value: 20,
            oldValue: 30,
            shipping: 3,
            currencyInfo: {
              locale: "en-GB",
              currencyCode: "GBP",
            },
          },
          imageURL: "https://90shop-api.vercel.app/images/HasbroOperation.jpg",
          imageAlt: "Lorem ipsum dolor sit amet consectetur.",
          availableQuantity: 21,
        },
        {
          id: 103,
          brand: "brandD",
          title: "titleD",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
          freeShipping: true,
          newest: false,
          price: {
            value: 50,
            shipping: 1,
            currencyInfo: {
              locale: "en-GB",
              currencyCode: "GBP",
            },
          },
          imageURL: "https://90shop-api.vercel.app/images/TycoRCPro-Am.jpg",
          imageAlt: "Lorem ipsum dolor sit amet consectetur.",
          availableQuantity: 30,
        },
        {
          id: 104,
          brand: "brandE",
          title: "titleE",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
          freeShipping: false,
          newest: false,
          price: {
            value: 10,
            shipping: 2,
            currencyInfo: {
              locale: "en-GB",
              currencyCode: "GBP",
            },
          },
          imageURL: "https://90shop-api.vercel.app/images/MattelSkip-Bo.jpg",
          imageAlt: "Lorem ipsum dolor sit amet consectetur.",
          availableQuantity: 7,
        },
      ])
    );
  }),
];
