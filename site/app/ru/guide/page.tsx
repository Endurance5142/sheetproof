import GuidePage from "../../guide/page";
import { pageMetadata } from "../../seo";
export const metadata = pageMetadata("ru", "guide", "/guide");
export default function Page() { return <GuidePage locale="ru" />; }
