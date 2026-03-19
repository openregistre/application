import { IconBrandFacebook, IconBrandLinkedin, IconBrandX, IconCheck, IconLink, IconShare } from "@tabler/icons-react"
import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { css } from "../../../styled-system/css/css"
import { Button } from "../button/button.tsx"
import { ButtonOutlineContent } from "../button/buttonOutlineContent.tsx"
import { Popover } from "../layouts/popover.tsx"


export function ShareButton(props: {
    /** The text to share (e.g. person name, role label) */
    title: string
    /** A short description for the share text */
    description?: string
    /** Hashtags for X/Twitter (without #) */
    hashtags?: Array<string>
}) {
    const [isCopied, setIsCopied] = useState(false)

    const url = window.location.href
    const hashtags = props.hashtags ?? ["OpenRegistre"]
    const shareText = props.description
        ? `${props.title} — ${props.description}`
        : props.title

    function shareOnX(setIsOpen: Dispatch<SetStateAction<boolean>>) {
        const text = encodeURIComponent(shareText)
        const tags = encodeURIComponent(hashtags.join(","))
        const u = encodeURIComponent(url)
        window.open(
            `https://x.com/intent/tweet?text=${text}&url=${u}&hashtags=${tags}`,
            "_blank",
            "noopener,noreferrer,width=550,height=420",
        )
        setIsOpen(false)
    }

    function shareOnFacebook(setIsOpen: Dispatch<SetStateAction<boolean>>) {
        const u = encodeURIComponent(url)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${u}`,
            "_blank",
            "noopener,noreferrer,width=550,height=420",
        )
        setIsOpen(false)
    }

    function shareOnLinkedIn(setIsOpen: Dispatch<SetStateAction<boolean>>) {
        const u = encodeURIComponent(url)
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
            "_blank",
            "noopener,noreferrer,width=550,height=420",
        )
        setIsOpen(false)
    }

    async function copyLink(setIsOpen: Dispatch<SetStateAction<boolean>>) {
        try {
            await navigator.clipboard.writeText(url)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
                setIsOpen(false)
            }, 1500)
        } catch {
            setIsOpen(false)
        }
    }

    return (
        <Popover
            triggerElement={
                <button>
                    <ButtonOutlineContent
                        leftIcon={<IconShare />}
                    />
                </button>
            }
            position="bottom"
            align="end"
        >
            {({ setIsOpen }) => (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                    })}
                >
                    <ShareMenuItem
                        icon={<IconBrandX size={16} />}
                        label="Partager sur X"
                        onClick={() => shareOnX(setIsOpen)}
                    />
                    <ShareMenuItem
                        icon={<IconBrandFacebook size={16} />}
                        label="Partager sur Facebook"
                        onClick={() => shareOnFacebook(setIsOpen)}
                    />
                    <ShareMenuItem
                        icon={<IconBrandLinkedin size={16} />}
                        label="Partager sur LinkedIn"
                        onClick={() => shareOnLinkedIn(setIsOpen)}
                    />
                    <div
                        className={css({
                            width: "100%",
                            height: "1px",
                            backgroundColor: "neutral/10",
                        })}
                    />
                    <ShareMenuItem
                        icon={isCopied ? <IconCheck size={16} /> : <IconLink size={16} />}
                        label={isCopied ? "Lien copié !" : "Copier le lien"}
                        onClick={() => copyLink(setIsOpen)}
                    />
                </div>
            )}
        </Popover>
    )
}


function ShareMenuItem(props: {
    icon: ReactNode
    label: string
    onClick: () => void
}) {
    return (
        <Button onClick={props.onClick}>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingX: "0.75rem",
                    paddingY: "0.5rem",
                    cursor: "pointer",
                    _hover: { backgroundColor: "neutral/5" },
                    transition: "all",
                    transitionDuration: "100ms",
                })}
            >
                <span
                    className={css({
                        flexShrink: "0",
                        stroke: "neutral/50",
                    })}
                >
                    {props.icon}
                </span>
                <span
                    className={css({
                        fontSize: "0.8125rem",
                        whiteSpace: "nowrap",
                        color: "neutral",
                    })}
                >
                    {props.label}
                </span>
            </div>
        </Button>
    )
}
