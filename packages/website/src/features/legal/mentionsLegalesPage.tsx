import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"
import { Logo } from "../../components/layouts/logo"


export function MentionsLegalesPage() {
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
            {/* Top bar */}
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
                        paddingY: "1rem",
                    })}
                >
                    <Link
                        to="/"
                        className={css({
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                        })}
                    >
                        <Logo />
                        <span
                            className={css({
                                color: "primary",
                                fontSize: "1rem",
                                fontWeight: "400",
                                letterSpacing: "-0.02em",
                            })}
                        >
                            OpenRegistre
                        </span>
                    </Link>
                </div>
            </div>

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
                        Mentions legales
                    </h1>
                    <p className={css({ color: "neutral/50", fontSize: "1rem", lineHeight: "1.6" })}>
                        Informations legales relatives au site OpenRegistre.
                    </p>
                </div>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Editeur du site
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le site OpenRegistre est edite par Barbote SAS, societe par actions simplifiee au capital variable, immatriculee au Registre du Commerce et des Societes sous le numero 908 719 503.
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Siege social : 93 rue Sedaine, 75011 Paris, France</li>
                        <li>Numero de TVA intracommunautaire : FR02 908 719 503</li>
                        <li>Directeur de la publication : Emile Sabatier</li>
                        <li>
                            Contact :{" "}
                            <a
                                href="mailto:contact@barbote.studio"
                                className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                            >
                                contact@barbote.studio
                            </a>
                        </li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Hebergement
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le site est heberge par OVH SAS, immatriculee au RCS Lille Metropole sous le numero 424 761 419 00045.
                    </p>
                    <ul className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.8", paddingLeft: "1.5rem", listStyleType: "disc" })}>
                        <li>Siege social : 2 rue Kellermann, 59100 Roubaix, France</li>
                        <li>Telephone : 1007</li>
                    </ul>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Propriete intellectuelle
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le code source d'OpenRegistre est distribue sous licence{" "}
                        <a
                            href="https://www.gnu.org/licenses/agpl-3.0.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            AGPL-3.0
                        </a>. Le code source est disponible sur{" "}
                        <a
                            href="https://github.com/sketchlabdev/openregistre"
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
                        Donnees personnelles
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Pour en savoir plus sur la maniere dont nous traitons vos donnees personnelles, veuillez consulter notre{" "}
                        <Link
                            to="/confidentialite"
                            className={css({ color: "primary", _hover: { textDecoration: "underline" } })}
                        >
                            politique de confidentialite
                        </Link>.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Cookies
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Le site OpenRegistre utilise uniquement des cookies strictement necessaires au fonctionnement du service (authentification, preferences de session). Aucun cookie publicitaire ou de suivi n'est utilise.
                    </p>
                </section>

                <section className={css({ display: "flex", flexDirection: "column", gap: "0.75rem" })}>
                    <h2 className={css({ color: "neutral", fontSize: "1.25rem", fontWeight: "400" })}>
                        Limitation de responsabilite
                    </h2>
                    <p className={css({ color: "neutral/75", fontSize: "0.9375rem", lineHeight: "1.6" })}>
                        Les informations presentees sur OpenRegistre sont fournies a titre informatif. Bien que nous nous efforcions de garantir l'exactitude des donnees, nous ne pouvons etre tenus responsables des erreurs ou omissions. Les sources de chaque fait sont systematiquement citees afin de permettre a chacun de verifier les informations.
                    </p>
                </section>

                <p className={css({ color: "neutral/25", fontSize: "0.8125rem", paddingTop: "1rem" })}>
                    Derniere mise a jour : 18 mars 2026
                </p>
            </div>
        </div>
    )
}
