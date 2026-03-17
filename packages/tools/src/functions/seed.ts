import { models } from '@openregistre/metadata/orm'
import { generateId } from "@openregistre/metadata/utilities"
import { count } from "drizzle-orm"
import { pbkdf2Sync, randomBytes } from "crypto"
import { dbClient } from '../utilities/dbClient'


async function seed() {
    try {
        const db = dbClient()
        const [{ total }] = await db.select({ total: count() }).from(models.person)
        if (total > 0) {
            console.log(`Data already exists (${total} persons found), skipping seed.`)
            return
        }

        await db.transaction(async (tx) => {
            const now = new Date().toISOString()


            // ================================================================
            // User (demo account)
            // ================================================================
            console.log("Seeding user...")
            const passwordSalt = randomBytes(16).toString('hex')
            const passwordHash = pbkdf2Sync("demo", passwordSalt, 128000, 64, `sha512`).toString(`hex`)
            await tx.insert(models.user).values({
                id: generateId(),
                isArchived: false,
                isActive: true,
                email: "demo@openregistre.com",
                passwordHash: passwordHash,
                passwordSalt: passwordSalt,
                createdAt: now,
            })


            // ================================================================
            // Roles
            // ================================================================
            console.log("Seeding roles...")
            const rolePresident = { id: generateId(), label: "Président de la République", createdAt: now }
            const rolePM = { id: generateId(), label: "Premier ministre", createdAt: now }
            const roleDepute = { id: generateId(), label: "Député", createdAt: now }
            const roleSenateur = { id: generateId(), label: "Sénateur", createdAt: now }
            const roleMaire = { id: generateId(), label: "Maire", createdAt: now }
            const roleMinistre = { id: generateId(), label: "Ministre", createdAt: now }
            const roleMinInterieur = { id: generateId(), label: "Ministre de l'Intérieur", createdAt: now }
            const roleMinEconomie = { id: generateId(), label: "Ministre de l'Économie", createdAt: now }

            await tx.insert(models.role).values([
                rolePresident, rolePM, roleDepute, roleSenateur,
                roleMaire, roleMinistre, roleMinInterieur, roleMinEconomie,
            ])


            // ================================================================
            // Political Parties
            // ================================================================
            console.log("Seeding political parties...")
            const partyLREM = { id: generateId(), name: "Renaissance", abbreviation: "RE", color: "#FFD600", createdAt: now }
            const partyLR = { id: generateId(), name: "Les Républicains", abbreviation: "LR", color: "#0066CC", createdAt: now }
            const partyPS = { id: generateId(), name: "Parti Socialiste", abbreviation: "PS", color: "#FF0066", createdAt: now }
            const partyRN = { id: generateId(), name: "Rassemblement National", abbreviation: "RN", color: "#0D2C6C", createdAt: now }
            const partyLFI = { id: generateId(), name: "La France Insoumise", abbreviation: "LFI", color: "#CC0000", createdAt: now }
            const partyEELV = { id: generateId(), name: "Europe Écologie Les Verts", abbreviation: "EELV", color: "#00A650", createdAt: now }

            await tx.insert(models.politicalParty).values([
                partyLREM, partyLR, partyPS, partyRN, partyLFI, partyEELV,
            ])


            // ================================================================
            // Persons
            // ================================================================
            console.log("Seeding persons...")
            const macron = {
                id: generateId(), fullName: "Emmanuel Macron",
                birthDate: "1977-12-21",
                links: ["https://fr.wikipedia.org/wiki/Emmanuel_Macron", "https://www.elysee.fr"],
                isFlagged: false, createdAt: now,
            }
            const lePen = {
                id: generateId(), fullName: "Marine Le Pen",
                birthDate: "1968-08-05",
                links: ["https://fr.wikipedia.org/wiki/Marine_Le_Pen"],
                isFlagged: false, createdAt: now,
            }
            const melenchon = {
                id: generateId(), fullName: "Jean-Luc Mélenchon",
                birthDate: "1951-08-19",
                links: ["https://fr.wikipedia.org/wiki/Jean-Luc_Mélenchon"],
                isFlagged: false, createdAt: now,
            }
            const darmanin = {
                id: generateId(), fullName: "Gérald Darmanin",
                birthDate: "1982-10-11",
                links: ["https://fr.wikipedia.org/wiki/Gérald_Darmanin"],
                isFlagged: false, createdAt: now,
            }
            const hidalgo = {
                id: generateId(), fullName: "Anne Hidalgo",
                birthDate: "1959-06-19",
                links: ["https://fr.wikipedia.org/wiki/Anne_Hidalgo"],
                isFlagged: false, createdAt: now,
            }
            const borne = {
                id: generateId(), fullName: "Élisabeth Borne",
                birthDate: "1961-04-18",
                links: ["https://fr.wikipedia.org/wiki/Élisabeth_Borne"],
                isFlagged: false, createdAt: now,
            }
            const leMaire = {
                id: generateId(), fullName: "Bruno Le Maire",
                birthDate: "1969-04-15",
                links: ["https://fr.wikipedia.org/wiki/Bruno_Le_Maire"],
                isFlagged: false, createdAt: now,
            }
            const zemmour = {
                id: generateId(), fullName: "Éric Zemmour",
                birthDate: "1958-08-31",
                links: ["https://fr.wikipedia.org/wiki/Éric_Zemmour"],
                isFlagged: false, createdAt: now,
            }
            const rousseau = {
                id: generateId(), fullName: "Sandrine Rousseau",
                birthDate: "1972-01-15",
                links: ["https://fr.wikipedia.org/wiki/Sandrine_Rousseau"],
                isFlagged: false, createdAt: now,
            }
            const bardella = {
                id: generateId(), fullName: "Jordan Bardella",
                birthDate: "1995-09-13",
                links: ["https://fr.wikipedia.org/wiki/Jordan_Bardella"],
                isFlagged: false, createdAt: now,
            }

            await tx.insert(models.person).values([
                macron, lePen, melenchon, darmanin, hidalgo,
                borne, leMaire, zemmour, rousseau, bardella,
            ])


            // ================================================================
            // Person-Role assignments
            // ================================================================
            console.log("Seeding person-role assignments...")
            await tx.insert(models.personRole).values([
                // Macron
                { id: generateId(), idPerson: macron.id, idRole: rolePresident.id, startingAt: "2017-05-14", createdAt: now },
                { id: generateId(), idPerson: macron.id, idRole: roleMinEconomie.id, startingAt: "2014-08-26", endingAt: "2016-08-30", createdAt: now },
                // Le Pen
                { id: generateId(), idPerson: lePen.id, idRole: roleDepute.id, startingAt: "2017-06-18", createdAt: now },
                // Mélenchon
                { id: generateId(), idPerson: melenchon.id, idRole: roleDepute.id, startingAt: "2017-06-18", createdAt: now },
                { id: generateId(), idPerson: melenchon.id, idRole: roleSenateur.id, startingAt: "2004-09-26", endingAt: "2010-03-21", createdAt: now },
                // Darmanin
                { id: generateId(), idPerson: darmanin.id, idRole: roleMinInterieur.id, startingAt: "2020-07-06", createdAt: now },
                { id: generateId(), idPerson: darmanin.id, idRole: roleMaire.id, startingAt: "2014-03-30", endingAt: "2020-07-06", createdAt: now },
                // Hidalgo
                { id: generateId(), idPerson: hidalgo.id, idRole: roleMaire.id, startingAt: "2014-04-05", createdAt: now },
                // Borne
                { id: generateId(), idPerson: borne.id, idRole: rolePM.id, startingAt: "2022-05-16", endingAt: "2024-01-09", createdAt: now },
                { id: generateId(), idPerson: borne.id, idRole: roleMinistre.id, startingAt: "2019-07-16", endingAt: "2022-05-16", createdAt: now },
                // Le Maire
                { id: generateId(), idPerson: leMaire.id, idRole: roleMinEconomie.id, startingAt: "2017-05-17", endingAt: "2024-01-11", createdAt: now },
                { id: generateId(), idPerson: leMaire.id, idRole: roleDepute.id, startingAt: "2007-06-17", endingAt: "2017-06-18", createdAt: now },
                // Rousseau
                { id: generateId(), idPerson: rousseau.id, idRole: roleDepute.id, startingAt: "2022-06-19", createdAt: now },
                // Bardella
                { id: generateId(), idPerson: bardella.id, idRole: roleDepute.id, startingAt: "2024-07-07", createdAt: now },
            ])


            // ================================================================
            // Person-Party assignments
            // ================================================================
            console.log("Seeding person-party assignments...")
            await tx.insert(models.personPoliticalParty).values([
                { id: generateId(), idPerson: macron.id, idPoliticalParty: partyLREM.id, startingAt: "2016-04-06", createdAt: now },
                { id: generateId(), idPerson: macron.id, idPoliticalParty: partyPS.id, startingAt: "2006-01-01", endingAt: "2009-01-01", createdAt: now },
                { id: generateId(), idPerson: lePen.id, idPoliticalParty: partyRN.id, startingAt: "2011-01-16", createdAt: now },
                { id: generateId(), idPerson: melenchon.id, idPoliticalParty: partyLFI.id, startingAt: "2016-02-10", createdAt: now },
                { id: generateId(), idPerson: melenchon.id, idPoliticalParty: partyPS.id, startingAt: "1976-01-01", endingAt: "2008-11-01", createdAt: now },
                { id: generateId(), idPerson: darmanin.id, idPoliticalParty: partyLREM.id, startingAt: "2017-05-01", createdAt: now },
                { id: generateId(), idPerson: darmanin.id, idPoliticalParty: partyLR.id, startingAt: "2007-01-01", endingAt: "2017-05-01", createdAt: now },
                { id: generateId(), idPerson: hidalgo.id, idPoliticalParty: partyPS.id, startingAt: "1994-01-01", createdAt: now },
                { id: generateId(), idPerson: borne.id, idPoliticalParty: partyLREM.id, startingAt: "2017-01-01", createdAt: now },
                { id: generateId(), idPerson: leMaire.id, idPoliticalParty: partyLREM.id, startingAt: "2017-05-01", createdAt: now },
                { id: generateId(), idPerson: leMaire.id, idPoliticalParty: partyLR.id, startingAt: "2002-01-01", endingAt: "2017-05-01", createdAt: now },
                { id: generateId(), idPerson: rousseau.id, idPoliticalParty: partyEELV.id, startingAt: "2011-01-01", createdAt: now },
                { id: generateId(), idPerson: bardella.id, idPoliticalParty: partyRN.id, startingAt: "2012-01-01", createdAt: now },
            ])


            // ================================================================
            // Publishers
            // ================================================================
            console.log("Seeding publishers...")
            const pubLeMonde = { id: generateId(), name: "Le Monde", websiteUrl: "https://www.lemonde.fr", createdAt: now }
            const pubFigaro = { id: generateId(), name: "Le Figaro", websiteUrl: "https://www.lefigaro.fr", createdAt: now }
            const pubLiberation = { id: generateId(), name: "Libération", websiteUrl: "https://www.liberation.fr", createdAt: now }
            const pubFranceInfo = { id: generateId(), name: "France Info", websiteUrl: "https://www.francetvinfo.fr", createdAt: now }
            const pubMediapart = { id: generateId(), name: "Mediapart", websiteUrl: "https://www.mediapart.fr", createdAt: now }
            const pubBFMTV = { id: generateId(), name: "BFM TV", websiteUrl: "https://www.bfmtv.com", createdAt: now }

            await tx.insert(models.publisher).values([
                pubLeMonde, pubFigaro, pubLiberation, pubFranceInfo, pubMediapart, pubBFMTV,
            ])


            // ================================================================
            // Facts
            // ================================================================
            console.log("Seeding facts...")
            const factMacronRetraites = {
                id: generateId(), idPerson: macron.id,
                title: "Réforme des retraites 2023",
                description: "Emmanuel Macron promulgue la réforme des retraites repoussant l'âge légal de départ de 62 à 64 ans, malgré une forte contestation sociale et l'utilisation de l'article 49.3 par le gouvernement.",
                occurredAt: "2023-04-15", category: "Législation",
                isFlagged: false, createdAt: now,
            }
            const factMacronDissolution = {
                id: generateId(), idPerson: macron.id,
                title: "Dissolution de l'Assemblée nationale",
                description: "Après la victoire du Rassemblement National aux élections européennes, Emmanuel Macron annonce la dissolution de l'Assemblée nationale, provoquant des élections législatives anticipées.",
                occurredAt: "2024-06-09", category: "Politique",
                isFlagged: false, createdAt: now,
            }
            const factMacronElection2017 = {
                id: generateId(), idPerson: macron.id,
                title: "Élection présidentielle de 2017",
                description: "Emmanuel Macron est élu président de la République française avec 66,1% des voix au second tour face à Marine Le Pen, devenant le plus jeune président de la Ve République.",
                occurredAt: "2017-05-07", category: "Élection",
                isFlagged: false, createdAt: now,
            }
            const factLePenProces = {
                id: generateId(), idPerson: lePen.id,
                title: "Procès des assistants parlementaires européens",
                description: "Marine Le Pen est jugée dans l'affaire des emplois présumés fictifs d'assistants parlementaires du FN au Parlement européen. Le parquet requiert une peine de cinq ans d'inéligibilité.",
                occurredAt: "2024-11-13", category: "Justice",
                isFlagged: false, createdAt: now,
            }
            const factMelenchonNUPES = {
                id: generateId(), idPerson: melenchon.id,
                title: "Création de la NUPES",
                description: "Jean-Luc Mélenchon initie la création de la Nouvelle Union Populaire Écologique et Sociale (NUPES), alliance de gauche réunissant LFI, le PS, EELV et le PCF pour les législatives de 2022.",
                occurredAt: "2022-05-01", category: "Politique",
                isFlagged: false, createdAt: now,
            }
            const factDarmaninLoiImmigration = {
                id: generateId(), idPerson: darmanin.id,
                title: "Loi immigration",
                description: "Gérald Darmanin porte le projet de loi pour contrôler l'immigration et améliorer l'intégration, texte controversé adopté après de vifs débats parlementaires et des concessions à la droite.",
                occurredAt: "2023-12-19", category: "Législation",
                isFlagged: false, createdAt: now,
            }
            const factHidalgoJO2024 = {
                id: generateId(), idPerson: hidalgo.id,
                title: "Jeux olympiques de Paris 2024",
                description: "En tant que maire de Paris, Anne Hidalgo supervise l'organisation des Jeux olympiques et paralympiques de Paris 2024, incluant la cérémonie d'ouverture sur la Seine.",
                occurredAt: "2024-07-26", category: "Événement",
                isFlagged: false, createdAt: now,
            }
            const factHidalgoCandidature = {
                id: generateId(), idPerson: hidalgo.id,
                title: "Candidature présidentielle 2022",
                description: "Anne Hidalgo se présente à l'élection présidentielle de 2022 sous les couleurs du Parti Socialiste, obtenant 1,75% des voix au premier tour, le plus bas score historique du PS.",
                occurredAt: "2022-04-10", category: "Élection",
                isFlagged: false, createdAt: now,
            }
            const factBorneNominationPM = {
                id: generateId(), idPerson: borne.id,
                title: "Nomination comme Première ministre",
                description: "Élisabeth Borne est nommée Première ministre par Emmanuel Macron, devenant la deuxième femme à occuper ce poste dans l'histoire de la Ve République, après Édith Cresson.",
                occurredAt: "2022-05-16", category: "Politique",
                isFlagged: false, createdAt: now,
            }
            const factLeMaireDette = {
                id: generateId(), idPerson: leMaire.id,
                title: "Alerte sur la dette publique",
                description: "Bruno Le Maire tire la sonnette d'alarme sur l'état des finances publiques françaises, avec une dette publique dépassant les 3 000 milliards d'euros et un déficit supérieur aux prévisions.",
                occurredAt: "2024-03-20", category: "Économie",
                isFlagged: false, createdAt: now,
            }
            const factZemmourCondamnation = {
                id: generateId(), idPerson: zemmour.id,
                title: "Condamnation pour provocation à la haine raciale",
                description: "Éric Zemmour est condamné pour provocation à la haine raciale après ses propos sur les mineurs isolés étrangers tenus sur CNews, une condamnation confirmée en appel.",
                occurredAt: "2022-01-17", category: "Justice",
                isFlagged: false, createdAt: now,
            }
            const factRousseau49_3 = {
                id: generateId(), idPerson: rousseau.id,
                title: "Opposition au 49.3 sur les retraites",
                description: "Sandrine Rousseau participe activement à l'opposition parlementaire contre l'utilisation du 49.3 par le gouvernement pour faire adopter la réforme des retraites sans vote.",
                occurredAt: "2023-03-16", category: "Législation",
                isFlagged: false, createdAt: now,
            }
            const factBardellaEuropeennes = {
                id: generateId(), idPerson: bardella.id,
                title: "Victoire aux élections européennes 2024",
                description: "Jordan Bardella mène la liste du Rassemblement National aux élections européennes de 2024, obtenant plus de 31% des voix, un score historique qui déclenche la dissolution de l'Assemblée nationale.",
                occurredAt: "2024-06-09", category: "Élection",
                isFlagged: false, createdAt: now,
            }

            await tx.insert(models.fact).values([
                factMacronRetraites, factMacronDissolution, factMacronElection2017,
                factLePenProces, factMelenchonNUPES, factDarmaninLoiImmigration,
                factHidalgoJO2024, factHidalgoCandidature, factBorneNominationPM,
                factLeMaireDette, factZemmourCondamnation, factRousseau49_3,
                factBardellaEuropeennes,
            ])


            // ================================================================
            // Sources
            // ================================================================
            console.log("Seeding sources...")
            await tx.insert(models.source).values([
                // Macron retraites
                {
                    id: generateId(), idFact: factMacronRetraites.id, idPublisher: pubLeMonde.id,
                    url: "https://www.lemonde.fr/politique/article/2023/04/15/reforme-des-retraites",
                    title: "Réforme des retraites : le Conseil constitutionnel valide l'essentiel du texte",
                    publishedAt: "2023-04-14", createdAt: now,
                },
                {
                    id: generateId(), idFact: factMacronRetraites.id, idPublisher: pubMediapart.id,
                    url: "https://www.mediapart.fr/journal/france/2023/03/16/retraites-49-3",
                    title: "Retraites : Macron passe en force avec le 49.3",
                    publishedAt: "2023-03-16", createdAt: now,
                },
                // Macron dissolution
                {
                    id: generateId(), idFact: factMacronDissolution.id, idPublisher: pubFranceInfo.id,
                    url: "https://www.francetvinfo.fr/elections/europeennes/dissolution-assemblee-nationale-macron",
                    title: "Emmanuel Macron annonce la dissolution de l'Assemblée nationale",
                    publishedAt: "2024-06-09", createdAt: now,
                },
                {
                    id: generateId(), idFact: factMacronDissolution.id, idPublisher: pubBFMTV.id,
                    url: "https://www.bfmtv.com/politique/dissolution-assemblee-nationale-macron-2024",
                    title: "Dissolution : les coulisses de la décision de Macron",
                    publishedAt: "2024-06-10", createdAt: now,
                },
                // Macron 2017
                {
                    id: generateId(), idFact: factMacronElection2017.id, idPublisher: pubFigaro.id,
                    url: "https://www.lefigaro.fr/elections/presidentielles/2017/05/07/macron-elu",
                    title: "Présidentielle 2017 : Emmanuel Macron élu président de la République",
                    publishedAt: "2017-05-07", createdAt: now,
                },
                // Le Pen procès
                {
                    id: generateId(), idFact: factLePenProces.id, idPublisher: pubMediapart.id,
                    url: "https://www.mediapart.fr/journal/france/2024/11/13/le-pen-proces-assistants",
                    title: "Procès des assistants parlementaires : Marine Le Pen face à la justice",
                    publishedAt: "2024-11-13", createdAt: now,
                },
                {
                    id: generateId(), idFact: factLePenProces.id, idPublisher: pubLeMonde.id,
                    url: "https://www.lemonde.fr/politique/article/2024/11/13/le-pen-requisitoire",
                    title: "Le parquet requiert cinq ans d'inéligibilité contre Marine Le Pen",
                    publishedAt: "2024-11-13", createdAt: now,
                },
                // Mélenchon NUPES
                {
                    id: generateId(), idFact: factMelenchonNUPES.id, idPublisher: pubLiberation.id,
                    url: "https://www.liberation.fr/politique/elections/nupes-accord-gauche-2022",
                    title: "NUPES : l'union de la gauche scellée autour de Mélenchon",
                    publishedAt: "2022-05-02", createdAt: now,
                },
                // Darmanin loi immigration
                {
                    id: generateId(), idFact: factDarmaninLoiImmigration.id, idPublisher: pubFigaro.id,
                    url: "https://www.lefigaro.fr/politique/loi-immigration-darmanin-2023",
                    title: "Loi immigration : Darmanin obtient l'adoption de son texte",
                    publishedAt: "2023-12-20", createdAt: now,
                },
                {
                    id: generateId(), idFact: factDarmaninLoiImmigration.id, idPublisher: pubFranceInfo.id,
                    url: "https://www.francetvinfo.fr/societe/immigration/loi-immigration-adoption",
                    title: "La loi immigration définitivement adoptée par le Parlement",
                    publishedAt: "2023-12-19", createdAt: now,
                },
                // Hidalgo JO
                {
                    id: generateId(), idFact: factHidalgoJO2024.id, idPublisher: pubBFMTV.id,
                    url: "https://www.bfmtv.com/paris/jo-2024-paris-ceremonie-ouverture",
                    title: "JO 2024 : la cérémonie d'ouverture sur la Seine éblouit le monde",
                    publishedAt: "2024-07-26", createdAt: now,
                },
                // Hidalgo candidature
                {
                    id: generateId(), idFact: factHidalgoCandidature.id, idPublisher: pubLeMonde.id,
                    url: "https://www.lemonde.fr/elections/article/2022/04/10/hidalgo-score-historiquement-bas",
                    title: "Présidentielle 2022 : Anne Hidalgo obtient un score historiquement bas",
                    publishedAt: "2022-04-10", createdAt: now,
                },
                // Borne PM
                {
                    id: generateId(), idFact: factBorneNominationPM.id, idPublisher: pubFranceInfo.id,
                    url: "https://www.francetvinfo.fr/politique/elisabeth-borne/nomination-premiere-ministre",
                    title: "Élisabeth Borne nommée Première ministre",
                    publishedAt: "2022-05-16", createdAt: now,
                },
                // Le Maire dette
                {
                    id: generateId(), idFact: factLeMaireDette.id, idPublisher: pubFigaro.id,
                    url: "https://www.lefigaro.fr/economie/dette-publique-le-maire-alerte-2024",
                    title: "Bruno Le Maire alerte sur la trajectoire de la dette publique",
                    publishedAt: "2024-03-20", createdAt: now,
                },
                // Zemmour condamnation
                {
                    id: generateId(), idFact: factZemmourCondamnation.id, idPublisher: pubMediapart.id,
                    url: "https://www.mediapart.fr/journal/france/2022/01/17/zemmour-condamnation",
                    title: "Éric Zemmour condamné pour provocation à la haine raciale",
                    publishedAt: "2022-01-17", createdAt: now,
                },
                // Rousseau 49.3
                {
                    id: generateId(), idFact: factRousseau49_3.id, idPublisher: pubLiberation.id,
                    url: "https://www.liberation.fr/politique/retraites/49-3-opposition-assemblee-2023",
                    title: "49.3 : la colère de l'opposition à l'Assemblée nationale",
                    publishedAt: "2023-03-16", createdAt: now,
                },
                // Bardella européennes
                {
                    id: generateId(), idFact: factBardellaEuropeennes.id, idPublisher: pubBFMTV.id,
                    url: "https://www.bfmtv.com/politique/europeennes-2024-rn-bardella-victoire",
                    title: "Européennes 2024 : Bardella et le RN largement en tête",
                    publishedAt: "2024-06-09", createdAt: now,
                },
                {
                    id: generateId(), idFact: factBardellaEuropeennes.id, idPublisher: pubLeMonde.id,
                    url: "https://www.lemonde.fr/elections/europeennes/2024/06/09/rn-premier-parti",
                    title: "Élections européennes : le RN premier parti de France avec plus de 31%",
                    publishedAt: "2024-06-09", createdAt: now,
                },
            ])


            console.log("Seeding complete!")
        })

    } catch (error) {
        console.log(error)
    }
}

console.log("Seeding starting.")
await seed()

process.exit()
