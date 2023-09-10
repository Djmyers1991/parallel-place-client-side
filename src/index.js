import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ParallelPlace } from "./parallel_place"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <ParallelPlace />
    </BrowserRouter>
)
