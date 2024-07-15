import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "./src/pages/login/login.html"),
        product_list: resolve(
          __dirname,
          "./src/pages/product/product_list.html"
        ),
        cart: resolve(__dirname, "./src/pages/cart/cart.html"),
      },
    },
  },
});
