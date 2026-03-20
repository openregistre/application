import { generateId } from "@openregistre/metadata/utilities"
import { cloneElement, Fragment, useEffect, useRef, useState, type ButtonHTMLAttributes, type Dispatch, type ReactElement, type ReactNode, type RefAttributes, type SetStateAction } from "react"
import { createPortal } from "react-dom"
import { css, cx, type Styles } from "../../../styled-system/css"


export function Popover(props: {
    triggerElement: ReactElement<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>
    children: ((context: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => ReactNode)
    position: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    className?: Styles
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0, })
    const popoverRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const align = props.align ?? "start"

    useEffect(() => {
        if (triggerRef.current === null) { return }
        if (popoverRef.current === null) { return }
        const rect = triggerRef.current.getBoundingClientRect()
        const popoverWidth = popoverRef.current.offsetWidth
        const popoverHeight = popoverRef.current.offsetHeight

        function alignHorizontal(): number {
            switch (align) {
                case "center":
                    return rect.left + window.scrollX + (rect.width / 2) - (popoverWidth / 2)
                case "end":
                    return rect.right + window.scrollX - popoverWidth
                case "start":
                default:
                    return rect.left + window.scrollX
            }
        }

        function alignVertical(): number {
            switch (align) {
                case "center":
                    return rect.top + window.scrollY + (rect.height / 2) - (popoverHeight / 2)
                case "end":
                    return rect.bottom + window.scrollY - popoverHeight
                case "start":
                default:
                    return rect.top + window.scrollY
            }
        }

        switch (props.position) {
            case "bottom":
                setCoords({
                    top: rect.bottom + window.scrollY,
                    left: alignHorizontal(),
                })
                break
            case "top":
                setCoords({
                    top: rect.top + window.scrollY - popoverHeight,
                    left: alignHorizontal(),
                })
                break
            case "right":
                setCoords({
                    top: alignVertical(),
                    left: rect.right + window.scrollX,
                })
                break
            case "left":
                setCoords({
                    top: alignVertical(),
                    left: rect.left + window.scrollX - popoverWidth,
                })
                break
            default:
                break
        }
    }, [triggerRef, popoverRef, isOpen, align])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                !popoverRef.current?.contains(e.target as Node)
                && !triggerRef.current?.contains(e.target as Node)
                && !(e.target as HTMLElement).closest('[data-ignore-clickoutside]')
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const modalElements = Array.from(document.querySelectorAll<HTMLElement>('[id^="modal-"]'))
    const inModal = modalElements.some((element) => element.contains(triggerRef.current))

    return (
        <Fragment>
            {/* Render trigger button */}
            {
                cloneElement(
                    props.triggerElement,
                    {
                        ref: triggerRef,
                        type: "button",
                        onClick: (event) => {
                            event.preventDefault()
                            setIsOpen(!isOpen)
                        },
                        "aria-haspopup": "true",
                        "aria-expanded": isOpen
                    }
                )
            }

            {/* Modal */}
            {
                (isOpen === false)
                    ? (null)
                    : (triggerRef.current === null)
                        ? (null)
                        : createPortal(
                            <div
                                ref={popoverRef}
                                id={`popover-${generateId()}`}
                                className={cx(
                                    css({
                                        position: "absolute",
                                        zIndex: inModal
                                            ? 51
                                            : 49,
                                        width: "fit-content",
                                        height: "fit-content",
                                        backgroundColor: "white",
                                        boxShadow: "md",
                                        justifyContent: "start",
                                        alignItems: "start",
                                        borderWidth: "1px",
                                        borderColor: "neutral/20",
                                        borderRadius: "0.5rem",
                                    }),
                                    {
                                        top: css({ marginTop: "-0.25rem" }),
                                        bottom: css({ marginTop: "0.25rem" }),
                                        left: css({ marginRight: "0.25rem" }),
                                        right: css({ marginLeft: "0.25rem" }),
                                    }[props.position]
                                )}
                                style={{
                                    display: isOpen ? "flex" : "none",
                                    minWidth: triggerRef.current?.offsetWidth,
                                    top: coords.top,
                                    left: coords.left,
                                }}
                            >
                                {
                                    props.children({
                                        isOpen: isOpen,
                                        setIsOpen: setIsOpen,
                                    })
                                }
                            </div>,
                            document.body,
                        )
            }
        </Fragment>
    )
}
