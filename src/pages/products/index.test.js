import { fireEvent, screen } from "@testing-library/react";

import App from "../../App";
import Products from ".";
import { addToCart } from "../../features/cart/cartSlice";
import { renderWithProviders } from "../../utils/test-utils";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { setupStore } from "../../app/store";
import user from "@testing-library/user-event";

const product = {
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
  quantity: 2,
};
describe("Home page", () => {
  test("Render products page", async () => {
    renderWithProviders(<Products />);

    const newestTitle = await screen.findByRole(
      "heading",
      { level: 1, name: "Newest" },
      { timeout: 2000 }
    );
    expect(newestTitle).toBeInTheDocument();

    const newestProducts = await screen.findByTestId("Newest-container");
    expect(newestProducts).toBeInTheDocument();
    expect(newestProducts.childElementCount).toBe(2);

    const productsTitle = await screen.findByRole(
      "heading",
      { level: 1, name: "90's Products" },
      { timeout: 2000 }
    );
    expect(productsTitle).toBeInTheDocument();

    const allProducts = await screen.findByTestId("products-container");
    expect(allProducts).toBeInTheDocument();
    expect(allProducts.childElementCount).toBe(5);
  });

  test("Render with api error", async () => {
    server.use(
      rest.get(
        "https://90shop-api.vercel.app/products/GBP",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    renderWithProviders(<App />);
    const error = await screen.findByRole("heading", {
      level: 1,
      name: "Some error occurred and the application was not able to receive the data. Please, contact the admin. See console for further information.",
    });
    expect(error).toBeInTheDocument();
  });

  test("Render with loading text", async () => {
    server.use(
      rest.get(
        "https://90shop-api.vercel.app/products/GBP",
        (req, res, ctx) => {
          jest.setTimeout(1100);
          return res(res);
        }
      )
    );

    renderWithProviders(<App />);
    const loadingText = await screen.findByRole("heading", {
      level: 1,
      name: "Loading...",
    });
    expect(loadingText).toBeInTheDocument();
  });

  test("Add product to cart", async () => {
    renderWithProviders(<Products />, { path: "/" });

    const addButton = await screen.findAllByRole("button", {
      name: "Add to cart",
    });
    fireEvent.click(addButton[0]);
    const removeButton = await screen.findAllByRole("button", {
      name: "Remove from cart",
    });
    expect(removeButton[0]).toBeInTheDocument();
  });

  test("Remove product from cart", async () => {
    const store = setupStore();
    store.dispatch(addToCart({ ...product }));

    renderWithProviders(<Products />, { path: "/", store });

    const removeButton = await screen.findAllByRole("button", {
      name: "Remove from cart",
    });
    fireEvent.click(removeButton[0]);
    const addButton = await screen.findAllByRole("button", {
      name: "Add to cart",
    });
    expect(addButton[0]).toBeInTheDocument();
  });

  test("Vertical cart redirection", async () => {
    renderWithProviders(<Products />, { path: "/" });

    let verticalCard = await screen.findAllByTestId("vertical-card-wrapper");
    expect(verticalCard[0]).toBeInTheDocument();
    await user.click(verticalCard[0]);
    expect(await screen.findByRole("img")).toBeInTheDocument();
  });

  test("Horizontal card redirection", async () => {
    renderWithProviders(<Products />, { path: "/" });

    let horizontalCard = await screen.findAllByTestId(
      "horizontal-card-wrapper"
    );
    expect(horizontalCard[0]).toBeInTheDocument();
    await user.click(horizontalCard[0]);
    expect(await screen.findByRole("img")).toBeInTheDocument();
  });
});
