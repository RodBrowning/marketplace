import Header from "./index";
import { addToCart } from "../../features/cart/cartSlice";
import { fetchProducts } from "../../features/products/productsSlice";
import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";

describe("Header", () => {
  test("Should render all nav links", async () => {
    renderWithProviders(<Header />);

    const logoText = screen.getByRole("heading", {
      level: 2,
      name: "90's Shop",
    });
    expect(logoText).toBeInTheDocument();

    const logoLink = screen.getByRole("link", { name: "90's Shop" });
    expect(logoLink).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();

    const cartLink = screen.getAllByRole("link");
    expect(cartLink[2]).toBeInTheDocument();
  });

  test("Should render cart number indicator with 1 products", async () => {
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
    const { store } = renderWithProviders(<Header />);
    await store.dispatch(fetchProducts());
    await store.dispatch(addToCart({ ...product }));

    const numberIndicator = await screen.findByTestId("num-itens");
    expect(numberIndicator).toBeInTheDocument();
    expect(numberIndicator.innerHTML).toBe("1");
  });

  test("Should render cart number indicator above 100 products", async () => {
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
    const { store } = renderWithProviders(<Header />);
    await store.dispatch(fetchProducts());
    await store.dispatch(addToCart({ ...product }));

    const numberIndicator = await screen.findByTestId("num-itens");
    expect(numberIndicator).toBeInTheDocument();

    for (let index = 0; index < 100; index++) {
      await store.dispatch(addToCart({ ...product }));
    }
    expect(numberIndicator.innerHTML).toBe("+99");
  });

  test("Should animate cart number indicator", async () => {
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
    const { store } = renderWithProviders(<Header />);
    await store.dispatch(fetchProducts());
    await store.dispatch(addToCart({ ...product }));

    const numberIndicator = await screen.findByTestId("num-itens");
    expect(numberIndicator).toBeInTheDocument();
    expect(numberIndicator).toHaveClass("animate");
    expect(numberIndicator.innerHTML).toBe("1");
    await new Promise((r) => setTimeout(r, 2000));
    expect(numberIndicator).not.toHaveClass("animate");
  });
});
