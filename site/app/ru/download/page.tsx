import DownloadPage from "../../download/page";
import { pageMetadata } from "../../seo";
export const metadata = pageMetadata("ru", "download", "/download");
export default function Page() { return <DownloadPage locale="ru" />; }
