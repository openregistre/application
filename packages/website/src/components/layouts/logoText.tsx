import { css, type Styles } from "../../../styled-system/css"


export function LogoText(props: {
    className?: Styles
}) {
    return (
        <span
            className={css(
                {
                    color: "primary",
                    fontSize: "0.9375rem",
                    fontWeight: "500",
                    letterSpacing: "-0.02em",
                },
                props.className,
            )}
        >
            OpenRegistre
        </span>
    )
}
