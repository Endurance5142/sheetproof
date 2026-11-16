import HomePage from "../page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("ru", "home", "/");
export default function Page() { return <HomePage locale="ru" />; }
