import { IconBookmark } from "@tabler/icons-react"
import { css, type Styles } from "../../../styled-system/css"


export function LogoIcon(props: {
    className?: Styles
}) {
    return (
        <IconBookmark
            size={16}
            className={css(
                {
                    stroke: "primary",
                },
                props.className,
            )}
        />
    )
}
