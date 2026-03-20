import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"


export function TermsPage() {
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
                        Conditions Générales d'Utilisation
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Conditions régissant l'utilisation du service OpenRegistre.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        1. Objet
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir les modalités et conditions d'utilisation du service OpenRegistre (ci-après "le Service"), accessible à l'adresse openregistre.fr, ainsi que les droits et obligations des utilisateurs.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'utilisation du Service implique l'acceptation pleine et entière des présentes CGU.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        2. Description du service
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        OpenRegistre est un moteur de recherche gratuit et open source consacré aux personnalités publiques françaises. Le Service permet de rechercher des informations sur les personnalités politiques, de consulter leurs faits marquants et d'accéder aux sources journalistiques associées.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        3. Inscription
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Aucune inscription n'est requise pour utiliser le Service.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        4. Utilisation du service
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'utilisateur s'engage à utiliser le Service de manière conforme aux lois et règlements en vigueur. Il est notamment interdit de :
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Utiliser le Service à des fins illégales ou non autorisées</li>
                        <li>Tenter d'accéder de manière non autorisée aux systèmes ou réseaux du Service</li>
                        <li>Interférer avec le bon fonctionnement du Service</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        5. Données et responsabilité
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les informations présentées sur OpenRegistre sont issues de sources publiques et journalistiques. Chaque fait est systématiquement associé à ses sources. Bien que nous nous efforcions de garantir l'exactitude et l'actualité des informations, nous ne pouvons garantir l'absence totale d'erreurs.
                    </p>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Toute personne concernée par une information présentée sur le Service peut demander une correction ou une suppression en nous contactant.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        6. Propriété intellectuelle
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le code source d'OpenRegistre est distribué sous licence{" "}
                        <a
                            href="https://www.gnu.org/licenses/agpl-3.0.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            AGPL-3.0
                        </a>.
                        Les contenus éditoriaux et les données structurées du Service restent la propriété de l'éditeur, sauf mention contraire.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        7. Protection des données
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le traitement des données personnelles est décrit dans notre{" "}
                        <Link
                            to="/confidentialité"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            politique de confidentialité
                        </Link>. En utilisant le Service, l'utilisateur accepte les pratiques décrites dans cette politique.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        8. Modification des CGU
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        L'éditeur se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des modifications par une notification sur le Service. La poursuite de l'utilisation du Service après modification vaut acceptation des nouvelles conditions.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        10. Droit applicable
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux de Paris seront seuls compétents.
                    </p>
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Dernière mise à jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
