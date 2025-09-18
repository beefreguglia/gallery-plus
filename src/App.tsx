import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutMain } from "./pages/layout-main";
import { PageComponents } from "./pages/page-components";
import { PageHome } from "./pages/page-home";
import { PagePhotoDetails } from "./pages/page-photo-details";

const queryCient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryCient}>
			<NuqsAdapter>
				<BrowserRouter>
					<Routes>
						<Route element={<LayoutMain />}>
							<Route index element={<PageHome />} />
							<Route path="/components" element={<PageComponents />} />
							<Route path="/photos/:id" element={<PagePhotoDetails />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</NuqsAdapter>
		</QueryClientProvider>
	);
}
