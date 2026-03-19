import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"


export function LegalPage() {
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
                    paddingX: "2rem",
                    paddingY: "2rem",
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
                        Mentions légales
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Informations légales relatives au site OpenRegistre.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Éditeur du site
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le site OpenRegistre est édité par Barbote SAS, société par actions simplifiée, immatriculée au Registre du Commerce et des Sociétés sous le numéro 908 719 503.
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Siège social : 93 rue Sedaine, 75011 Paris, France</li>
                        <li>Numéro de TVA intracommunautaire : FR02 908 719 503</li>
                        <li>
                            Contact :{" "}
                            <a
                                href="mailto:contact@openregistre.com"
                                className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                            >
                                contact@openregistre.com
                            </a>
                        </li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Hébergement
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le site est hébergé par OVH SAS, immatriculée au RCS Lille Métropole sous le numéro 424 761 419 00045.
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Siège social : 2 rue Kellermann, 59100 Roubaix, France</li>
                        <li>Téléphone : 1007</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Propriété intellectuelle
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
                        </a>. Le code source est disponible sur{" "}
                        <a
                            href="https://github.com/openregistre"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            GitHub
                        </a>.
                        Les contenus éditoriaux et les données structurées du Service restent la propriété de l'éditeur, sauf mention contraire.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Données personnelles
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Pour en savoir plus sur la manière dont nous traitons vos données personnelles, veuillez consulter notre{" "}
                        <Link
                            to="/confidentialité"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            politique de confidentialité
                        </Link>.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Cookies
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le site OpenRegistre utilise uniquement des cookies strictement nécessaires au fonctionnement du service (authentification, préférences de session). Aucun cookie publicitaire ou de suivi n'est utilisé.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Limitation de responsabilité
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les informations présentées sur OpenRegistre sont fournies à titre informatif. Bien que nous nous efforcions de garantir l'exactitude des données, nous ne pouvons être tenus responsables des erreurs ou omissions. Les sources de chaque fait sont systématiquement citées afin de permettre à chacun de vérifier les informations.
                    </p>
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Dernière mise à jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
