import { IconBrandFacebook, IconBrandLinkedin, IconBrandX, IconCheck, IconLink, IconShare } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { css } from "../../../styled-system/css/css"


export function ShareButton(props: {
    /** The text to share (e.g. person name, role label) */
    title: string
    /** A short description for the share text */
    description?: string
    /** Hashtags for X/Twitter (without #) */
    hashtags?: Array<string>
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const url = window.location.href
    const hashtags = props.hashtags ?? ["OpenRegistre"]
    const shareText = props.description
        ? `${props.title} — ${props.description}`
        : props.title

    // Close menu on outside click
    useEffect(() => {
        if (!isOpen) return

        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    function shareOnX() {
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

    function shareOnFacebook() {
        const u = encodeURIComponent(url)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${u}`,
            "_blank",
            "noopener,noreferrer,width=550,height=420",
        )
        setIsOpen(false)
    }

    function shareOnLinkedIn() {
        const u = encodeURIComponent(url)
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
            "_blank",
            "noopener,noreferrer,width=550,height=420",
        )
        setIsOpen(false)
    }

    async function copyLink() {
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
        <div
            ref={menuRef}
            className={css({
                position: "relative",
                display: "inline-flex",
            })}
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    paddingX: "0.625rem",
                    paddingY: "0.375rem",
                    borderRadius: "0.375rem",
                    borderWidth: "1px",
                    borderColor: "neutral/15",
                    backgroundColor: "white",
                    color: "neutral/50",
                    fontSize: "0.8125rem",
                    lineHeight: "1",
                    cursor: "pointer",
                    transition: "all",
                    transitionDuration: "150ms",
                    _hover: {
                        borderColor: "neutral/25",
                        color: "neutral/75",
                        boxShadow: "sm",
                    },
                })}
            >
                <IconShare size={14} />
                Partager
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className={css({
                        position: "absolute",
                        top: "calc(100% + 0.375rem)",
                        right: "0",
                        minWidth: "12rem",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                        boxShadow: "lg",
                        zIndex: "50",
                        overflow: "hidden",
                        animation: "fadeIn",
                        animationDuration: "150ms",
                    })}
                >
                    <ShareMenuItem
                        icon={<IconBrandX size={16} />}
                        label="Partager sur X"
                        onClick={shareOnX}
                    />
                    <ShareMenuItem
                        icon={<IconBrandFacebook size={16} />}
                        label="Partager sur Facebook"
                        onClick={shareOnFacebook}
                    />
                    <ShareMenuItem
                        icon={<IconBrandLinkedin size={16} />}
                        label="Partager sur LinkedIn"
                        onClick={shareOnLinkedIn}
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
                        label={isCopied ? "Lien copie !" : "Copier le lien"}
                        onClick={copyLink}
                    />
                </div>
            )}
        </div>
    )
}


function ShareMenuItem(props: {
    icon: React.ReactNode
    label: string
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={css({
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingX: "0.75rem",
                paddingY: "0.5rem",
                fontSize: "0.8125rem",
                color: "neutral/75",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background-color",
                transitionDuration: "100ms",
                _hover: {
                    backgroundColor: "neutral/5",
                },
            })}
        >
            {props.icon}
            {props.label}
        </button>
    )
}
