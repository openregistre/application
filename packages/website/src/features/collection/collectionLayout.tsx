import { Outlet } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"


export function CollectionLayout() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "background",
            })}
        >
            <Outlet />
        </div>
    )
}
