import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"
import { ShareButton } from "../share/shareButton"


export function ActionBar(props: {
    /** Share button props — omit to hide the share button */
    share?: {
        title: string
        description?: string
        hashtags?: Array<string>
    }
}) {
    return (
        <div
            className={css({
                width: "100%",
                borderBottomWidth: "1px",
                borderBottomColor: "neutral/10",
                backgroundColor: "white",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "64rem",
                    marginX: "auto",
                    paddingX: "1.5rem",
                    paddingY: "0.5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                })}
            >
                <Link
                    to="/"
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        color: "neutral/50",
                        fontSize: "0.875rem",
                        _hover: { color: "neutral/75" },
                    })}
                >
                    <IconArrowLeft size={14} />
                    Retour
                </Link>

                {props.share && (
                    <ShareButton
                        title={props.share.title}
                        description={props.share.description}
                        hashtags={props.share.hashtags}
                    />
                )}
            </div>
        </div>
    )
}
