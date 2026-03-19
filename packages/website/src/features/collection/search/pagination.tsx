import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { css } from "../../../../styled-system/css/css"
import { Button } from "../../../components/button/button.tsx"
import { ButtonOutlineContent } from "../../../components/button/buttonOutlineContent.tsx"


const PAGE_SIZE = 20

export function Pagination(props: {
    page: number
    totalCount: number
    onPageChange: (page: number) => void
}) {
    const totalPages = Math.max(1, Math.ceil(props.totalCount / PAGE_SIZE))
    const hasPrevious = props.page > 1
    const hasNext = props.page < totalPages

    if (totalPages <= 1) return null

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                paddingY: "1rem",
            })}
        >
            <Button
                onClick={() => props.onPageChange(props.page - 1)}
                isDisabled={!hasPrevious}
            >
                <ButtonOutlineContent
                    leftIcon={<IconChevronLeft />}
                    text="Précédent"
                />
            </Button>

            <span
                className={css({
                    fontSize: "0.875rem",
                    lineHeight: "1rem",
                    color: "neutral/50",
                    whiteSpace: "nowrap",
                })}
            >
                {props.page} / {totalPages}
            </span>

            <Button
                onClick={() => props.onPageChange(props.page + 1)}
                isDisabled={!hasNext}
            >
                <ButtonOutlineContent
                    text="Suivant"
                    rightIcon={<IconChevronRight />}
                />
            </Button>
        </div>
    )
}
