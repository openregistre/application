import { css } from "../../../styled-system/css/css"


export function PhilosophyPage() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "background",
            })}
        >
            {/* Content */}
            <div
                className={css({
                    width: "100%",
                    maxWidth: "64rem",
                    marginX: "auto",
                    paddingX: "1.5rem",
                    paddingY: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                })}
            >
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                    <h1
                        className={css({
                            color: "primary",
                            fontSize: "2rem",
                            fontWeight: "400",
                            letterSpacing: "-0.02em",
                        })}
                    >
                        Notre philosophie
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Pourquoi OpenRegistre existe, et comment nous concevons la transparence de l'information politique.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Notre vision
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Nous pensons que l'information sur les personnalités publiques devrait être accessible à tous, facilement et gratuitement. Trop souvent, les faits marquants, les prises de position et les parcours politiques sont dispersés dans des dizaines de sources différentes, rendant difficile pour les citoyens de se forger une opinion éclairée.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        OpenRegistre a été créé pour centraliser ces informations et les rendre accessibles en quelques clics. Notre moteur de recherche permet de retrouver rapidement une personnalité publique, ses faits marquants et les sources journalistiques associées.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Pourquoi l'open source ?
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        La transparence est au cœur de notre projet. Il serait contradictoire de promouvoir la transparence de la vie publique tout en cachant le fonctionnement de notre outil. C'est pourquoi le code d'OpenRegistre est entièrement ouvert, sous licence AGPL-3.0.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Chacun peut consulter notre code source, proposer des améliorations ou signaler des erreurs. Cette transparence est notre meilleure garantie d'intégrité.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Notre code source est disponible sur{" "}
                        <a
                            href="https://github.com/openregistre"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            GitHub
                        </a>.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Notre modèle
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        OpenRegistre est un projet gratuit et ouvert. Nous ne vendons aucune donnée personnelle, nous n'affichons aucune publicité et nous ne proposons aucun abonnement payant. Notre objectif est uniquement de servir l'intérêt général en facilitant l'accès à l'information publique.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Nous proposons cependant des services payants pour les organisations qui souhaitent intégrer notre base de données dans leurs outils. Ces revenus nous permettent de financer l'hébergement et le développement du projet, tout en garantissant que l'accès à l'information reste gratuit pour tous les citoyens.
                    </p>
                    {/* <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le projet est développé et maintenu par{" "}
                        <a
                            href="https://barbote.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            Barbote
                        </a>, qui finance l'hébergement et le développement.
                    </p> */}
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Dernière mise à jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
