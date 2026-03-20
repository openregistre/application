import { IconCheck, IconLink } from "@tabler/icons-react"
import { useState } from "react"
import { css } from "../../../styled-system/css/css"
import { ButtonOutlineContent } from "../button/buttonOutlineContent.tsx"


export function ShareButton() {
    const [isCopied, setIsCopied] = useState(false)

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 1500)
        } catch {
            // silently fail
        }
    }

    return (
        <button onClick={copyLink}>
            <ButtonOutlineContent
                leftIcon={
                    isCopied
                        ? <IconCheck className={css({ stroke: "success" })} />
                        : <IconLink />
                }
            />
        </button>
    )
}
