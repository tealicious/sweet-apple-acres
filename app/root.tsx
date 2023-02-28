import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";
import globalStyles from "~/styles/global.css";
import sakuraStyles from "~/styles/sakura.css";
import { MainNav } from "~/components/UI/UI";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
  },
  { rel: "stylesheet", href: sakuraStyles },
  { rel: "stylesheet", href: globalStyles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sweet Apple Acres",
  viewport: "width=device-width,initial-scale=1",
});

const SharedNav = function (props: { ariaLabel: string; className?: string }) {
  return (
    <MainNav aria-label={props.ariaLabel} className={props.className}>
      <Link to={"/"} aria-label="Home Link">
        Sweet Apple Acres
      </Link>
      <a href="tel:+123456789" aria-label="phone link to sweet apple acres">
        Call @ 123-SUH-WEET
      </a>
      <Link to={"/cart"} aria-label="Cart Link">
        Cart
      </Link>
    </MainNav>
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <div id="modal-root"></div>
        <SharedNav ariaLabel={"main nav"} />
        <div id="main">
          <Outlet />
        </div>
        <footer>
          <SharedNav ariaLabel={"footer nav"} className="footer-nav" />
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
