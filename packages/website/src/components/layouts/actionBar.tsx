import { IconArrowLeft } from "@tabler/icons-react"
import { useRouter } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"
import { Button } from "../button/button.tsx"
import { ButtonGhostContent } from "../button/buttonGhostContent.tsx"
import { ShareButton } from "../share/shareButton"


export function ActionBar(props: {
    /** Share button props — omit to hide the share button */
    share?: {
        title: string
        description?: string
        hashtags?: Array<string>
    }
}) {
    const router = useRouter()

    return (
        <div
            className={css({
                // position: "sticky",
                // top: 0,
                // zIndex: 10,
                width: "100%",
                borderBottomWidth: "1px",
                borderBottomColor: "neutral/10",
                backgroundColor: "white",
                padding: "1rem",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "64rem",
                    marginX: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                })}
            >
                <Button
                    onClick={() => { router.history.back() }}
                >
                    <ButtonGhostContent
                        leftIcon={<IconArrowLeft />}
                        text="Retour"
                    />
                </Button>

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
