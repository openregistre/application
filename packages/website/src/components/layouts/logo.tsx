import { IconBookFilled } from "@tabler/icons-react"
import { css, type Styles } from "../../../styled-system/css"


export function Logo(props: {
    className?: Styles
}) {
    return (
        <div
            className={css({
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                // backgroundColor: "primary",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
                props.className,
            )}
        >
            <IconBookFilled
                className={css({
                    fill: "primary",
                })}
            />
        </div>
    )
}
