import { models } from '@openregistre/metadata/orm'
import { generateId } from "@openregistre/metadata/utilities"
import { count } from "drizzle-orm"
import { pbkdf2Sync, randomBytes } from "crypto"
import { dbClient } from '../utilities/dbClient.js'


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
            const rolePresidentAN = { id: generateId(), label: "Président de l'Assemblée nationale", createdAt: now }
            const rolePresidentGroupe = { id: generateId(), label: "Président de groupe parlementaire", createdAt: now }
            const roleMinJustice = { id: generateId(), label: "Ministre de la Justice", createdAt: now }
            const roleMinEducation = { id: generateId(), label: "Ministre de l'Éducation nationale", createdAt: now }
            const roleMinSante = { id: generateId(), label: "Ministre de la Santé", createdAt: now }
            const roleMinAgriculture = { id: generateId(), label: "Ministre de l'Agriculture", createdAt: now }
            const roleDepEuropeen = { id: generateId(), label: "Député européen", createdAt: now }
            const rolePresidentRegion = { id: generateId(), label: "Président de région", createdAt: now }

            await tx.insert(models.role).values([
                rolePresident, rolePM, roleDepute, roleSenateur,
                roleMaire, roleMinistre, roleMinInterieur, roleMinEconomie,
                rolePresidentAN, rolePresidentGroupe, roleMinJustice, roleMinEducation,
                roleMinSante, roleMinAgriculture, roleDepEuropeen, rolePresidentRegion,
            ])


            // ================================================================
            // Political Parties
            // ================================================================
            console.log("Seeding political parties...")
            const partyRE = { id: generateId(), name: "Renaissance", abbreviation: "RE", color: "#FFD600", createdAt: now }
            const partyLR = { id: generateId(), name: "Les Républicains", abbreviation: "LR", color: "#0066CC", createdAt: now }
            const partyPS = { id: generateId(), name: "Parti Socialiste", abbreviation: "PS", color: "#FF0066", createdAt: now }
            const partyRN = { id: generateId(), name: "Rassemblement National", abbreviation: "RN", color: "#0D2C6C", createdAt: now }
            const partyLFI = { id: generateId(), name: "La France Insoumise", abbreviation: "LFI", color: "#CC0000", createdAt: now }
            const partyEELV = { id: generateId(), name: "Europe Écologie Les Verts", abbreviation: "EELV", color: "#00A650", createdAt: now }
            const partyPCF = { id: generateId(), name: "Parti Communiste Français", abbreviation: "PCF", color: "#DD0000", createdAt: now }
            const partyMoDem = { id: generateId(), name: "Mouvement Démocrate", abbreviation: "MoDem", color: "#FF9900", createdAt: now }
            const partyHorizons = { id: generateId(), name: "Horizons", abbreviation: "HOR", color: "#00BFFF", createdAt: now }
            const partyUDR = { id: generateId(), name: "Union des Droites pour la République", abbreviation: "UDR", color: "#1B3A6B", createdAt: now }
            const partyLiot = { id: generateId(), name: "Libertés, Indépendants, Outre-mer et Territoires", abbreviation: "LIOT", color: "#AAAAAA", createdAt: now }
            const partyGS = { id: generateId(), name: "Génération.s", abbreviation: "G.s", color: "#E4003A", createdAt: now }
            const partyR = { id: generateId(), name: "Reconquête", abbreviation: "R!", color: "#1A1A2E", createdAt: now }
            const partyUDI = { id: generateId(), name: "Union des Démocrates et Indépendants", abbreviation: "UDI", color: "#00CCCC", createdAt: now }
            const partyPRG = { id: generateId(), name: "Parti Radical de Gauche", abbreviation: "PRG", color: "#FFD1DC", createdAt: now }

            await tx.insert(models.politicalParty).values([
                partyRE, partyLR, partyPS, partyRN, partyLFI, partyEELV,
                partyPCF, partyMoDem, partyHorizons, partyUDR, partyLiot,
                partyGS, partyR, partyUDI, partyPRG,
            ])


            // ================================================================
            // Persons — Major political figures + ~100 real députés
            // ================================================================
            console.log("Seeding persons...")

            // Helper to create a person object
            const p = (fullName: string, birthDate: string, links: string[] = []) => ({
                id: generateId(), fullName, birthDate,
                links: links.length > 0 ? links : [`https://fr.wikipedia.org/wiki/${encodeURIComponent(fullName.replace(/ /g, "_"))}`],
                isFlagged: false, createdAt: now,
            })

            // --- Major national figures ---
            const macron = p("Emmanuel Macron", "1977-12-21", ["https://fr.wikipedia.org/wiki/Emmanuel_Macron", "https://www.elysee.fr"])
            const lePen = p("Marine Le Pen", "1968-08-05")
            const melenchon = p("Jean-Luc Mélenchon", "1951-08-19")
            const darmanin = p("Gérald Darmanin", "1982-10-11")
            const hidalgo = p("Anne Hidalgo", "1959-06-19")
            const borne = p("Élisabeth Borne", "1961-04-18")
            const leMaire = p("Bruno Le Maire", "1969-04-15")
            const zemmour = p("Éric Zemmour", "1958-08-31")
            const rousseau = p("Sandrine Rousseau", "1972-01-15")
            const bardella = p("Jordan Bardella", "1995-09-13")
            const attal = p("Gabriel Attal", "1989-03-16")
            const hollande = p("François Hollande", "1954-08-12")
            const braunPivet = p("Yaël Braun-Pivet", "1970-11-07")
            const panot = p("Mathilde Panot", "1989-10-16")
            const wauquiez = p("Laurent Wauquiez", "1975-04-12")
            const chatelain = p("Cyrielle Chatelain", "1987-06-05")
            const vallaud = p("Boris Vallaud", "1976-06-26")
            const ciotti = p("Éric Ciotti", "1965-09-28")
            const faure = p("Olivier Faure", "1968-04-06")
            const fesneau = p("Marc Fesneau", "1971-02-28")
            const ruffin = p("François Ruffin", "1975-10-23")
            const coquerel = p("Éric Coquerel", "1958-09-30")
            const bompard = p("Manuel Bompard", "1986-06-15")
            const chenu = p("Sébastien Chenu", "1973-01-19")
            const bayrou = p("François Bayrou", "1951-05-25")
            const philippeE = p("Édouard Philippe", "1970-11-28")
            const retailleau = p("Bruno Retailleau", "1960-11-20")

            // --- RN députés (XVIIe législature) ---
            const allisio = p("Prisca Thevenot", "1985-08-05")
            const amrani = p("Laure Lavalette", "1988-03-30")
            const audouy = p("Edwige Diaz", "1987-08-18")
            const baubry = p("José Beaurain", "1966-04-12")
            const bilde = p("Dominique Bilde", "1955-02-01")
            const cabrolier = p("Julien Odoul", "1985-05-22")
            const catteau = p("Thomas Ménagé", "1993-04-15")
            const chudeau = p("Roger Chudeau", "1954-03-10")
            const dalloz = p("Grégoire de Fournas", "1988-09-21")
            const delmotte = p("Alexis Jolly", "1993-07-01")
            const falcon = p("Bryan Masson", "1996-01-18")
            const gaultierDM = p("Yoann Gillet", "1988-06-09")
            const grenon = p("Jonathan Gery", "1990-12-25")
            const hirsch = p("Katiana Levavasseur", "1983-02-14")
            const jacobelli = p("Florence Goulet", "1965-07-20")
            const jaouen = p("Timothée Houssin", "1996-03-07")
            const lepers = p("Philippe Lottiaux", "1965-11-28")
            const marchio = p("Nicolas Meizonnet", "1989-10-02")
            const marechal = p("Michèle Martinez", "1983-04-22")
            const meurin = p("Stéphane Rambaud", "1969-08-31")

            // --- LFI députés ---
            const autain = p("Clémentine Autain", "1973-05-26")
            const bernalicis = p("Ugo Bernalicis", "1990-04-17")
            const boyard = p("Louis Boyard", "2000-09-26")
            const corbiere = p("Alexis Corbière", "1968-08-18")
            const dufour = p("Alma Dufour", "1992-09-12")
            const garrido = p("Raquel Garrido", "1974-06-13")
            const guiraud = p("David Guiraud", "1992-06-17")
            const knaebel = p("Andy Kerbrat", "1990-01-15")
            const lachaud = p("Bastien Lachaud", "1985-12-02")
            const legrain = p("Antoine Léaument", "1993-09-18")
            const mathieu = p("Damien Maudet", "1995-07-22")
            const obono = p("Danièle Obono", "1972-04-08")
            const piquemal = p("François Piquemal", "1987-01-23")
            const portes = p("Thomas Portes", "1986-05-28")
            const ratenon = p("Jean-Hugues Ratenon", "1965-08-31")
            const rome = p("Claudia Rouaux", "1968-06-20")
            const simonnet = p("Danielle Simonnet", "1971-06-07")

            // --- PS députés ---
            const batho = p("Delphine Batho", "1973-03-23")
            const brun = p("Inaki Echaniz", "1990-10-05")
            const carvounas = p("Jérôme Guedj", "1972-11-18")
            const delaporte = p("Arthur Delaporte", "1991-12-25")
            const descamps = p("Christine Pirès Beaune", "1963-09-15")
            const dufeu = p("Dominique Potier", "1965-01-27")
            const falorni = p("Olivier Falorni", "1964-07-27")
            const jumel = p("Sébastien Jumel", "1972-10-11")
            const keloua = p("Fatiha Keloua Hachi", "1976-06-30")
            const leseney = p("Bertrand Petit", "1964-07-09")
            const naillet = p("Philippe Naillet", "1962-02-28")
            const ostermann = p("Anna Pic", "1977-03-08")

            // --- EELV députés ---
            const arenas = p("Lisa Belluco", "1989-02-18")
            const balanant = p("Benjamin Lucas-Lundy", "1981-10-07")
            const benarroche = p("Karim Ben Cheikh", "1969-01-12")
            const bilongo = p("Carlos Martens Bilongo", "1984-12-29")
            const bourouaha = p("Cyrielle Chatelain", "1987-06-05")
            const caron = p("Pouria Amirshahi", "1972-04-15")
            const clouet = p("Marie-Charlotte Garin", "1991-06-18")
            const delogu = p("Nicolas Thierry", "1978-11-14")
            const dupont = p("Julie Laernoes", "1982-03-26")
            const iordanoff = p("Hubert Julien-Laferrière", "1964-02-15")
            const jerretie = p("Sandra Regol", "1979-10-23")

            // --- RE / Ensemble députés ---
            const adam = p("Véronique Louwagie", "1963-07-05")
            const alauzet = p("Aurore Bergé", "1986-11-15")
            const amadou = p("Maud Bregeon", "1988-04-12")
            const amiot = p("Clément Beaune", "1981-08-14")
            const ardouin = p("Stéphanie Rist", "1977-12-01")
            const atallah = p("Pieyre-Alexandre Anglade", "1983-03-20")
            const bachelier = p("David Amiel", "1990-04-28")
            const berete = p("Caroline Yadan", "1971-06-03")
            const biais = p("Jean-René Cazeneuve", "1959-06-30")
            const bordes = p("Florent Boudié", "1973-02-09")
            const briquet = p("Anne Genetet", "1963-09-27")
            const castaner = p("Christophe Castaner", "1966-01-03")
            const cazebonne = p("Samantha Cazebonne", "1972-07-09")
            const cesarini = p("Roland Lescure", "1966-05-14")
            const colomb = p("Sylvain Maillard", "1978-03-20")
            const desarnaud = p("Thomas Cazenave", "1977-12-08")
            const elimas = p("Nadia Hai", "1980-01-03")

            // --- LR députés ---
            const abad = p("Damien Abad", "1980-04-05")
            const bazin = p("Thibault Bazin", "1981-07-19")
            const becht = p("Olivier Becht", "1970-10-15")
            const bony = p("Emmanuelle Anthoine", "1966-05-23")
            const breton = p("Xavier Breton", "1964-10-20")
            const cinieri = p("Pierre Cordier", "1975-06-18")
            const descoeur = p("Fabrice Brun", "1969-08-12")
            const dive = p("Julien Dive", "1984-09-01")
            const forissier = p("Nicolas Forissier", "1963-02-13")
            const genevard = p("Annie Genevard", "1956-05-07")

            // --- MoDem députés ---
            const babary = p("Erwan Balanant", "1976-03-18")
            const berta = p("Philippe Berta", "1960-09-26")
            const bolo = p("Bruno Millienne", "1959-11-15")
            const brocard = p("Elodie Jacquier-Laforge", "1975-05-21")
            const essayan = p("Jimmy Pahun", "1955-09-01")

            // --- PCF députés ---
            const music = p("André Chassaigne", "1950-06-02")
            const music2 = p("Elsa Faucillon", "1981-01-06")
            const music3 = p("Pierre Dharréville", "1974-06-09")
            const music4 = p("Jean-Paul Lecoq", "1958-08-13")
            const music5 = p("Fabien Roussel", "1969-04-16")

            // --- Horizons députés ---
            const dhersin = p("Naïma Moutchou", "1983-07-28")
            const kox = p("François Jolivet", "1960-12-22")
            const leroy = p("Agnès Firmin Le Bodo", "1972-05-18")
            const marcangeli = p("Laurent Marcangeli", "1975-04-20")

            // --- LIOT députés ---
            const acquaviva = p("Jean-Félix Acquaviva", "1971-05-25")
            const colombani = p("Paul-André Colombani", "1965-04-12")
            const pancher = p("Bertrand Pancher", "1959-03-11")
            const taupiac = p("David Taupiac", "1974-08-19")


            const allPersons = [
                macron, lePen, melenchon, darmanin, hidalgo, borne, leMaire, zemmour, rousseau, bardella,
                attal, hollande, braunPivet, panot, wauquiez, chatelain, vallaud, ciotti, faure, fesneau,
                ruffin, coquerel, bompard, chenu, bayrou, philippeE, retailleau,
                // RN
                allisio, amrani, audouy, baubry, bilde, cabrolier, catteau, chudeau, dalloz, delmotte,
                falcon, gaultierDM, grenon, hirsch, jacobelli, jaouen, lepers, marchio, marechal, meurin,
                // LFI
                autain, bernalicis, boyard, corbiere, dufour, garrido, guiraud, knaebel, lachaud, legrain,
                mathieu, obono, piquemal, portes, ratenon, rome, simonnet,
                // PS
                batho, brun, carvounas, delaporte, descamps, dufeu, falorni, jumel, keloua, leseney, naillet, ostermann,
                // EELV
                arenas, balanant, benarroche, bilongo, bourouaha, caron, clouet, delogu, dupont, iordanoff, jerretie,
                // RE
                adam, alauzet, amadou, amiot, ardouin, atallah, bachelier, berete, biais, bordes,
                briquet, castaner, cazebonne, cesarini, colomb, desarnaud, elimas,
                // LR
                abad, bazin, becht, bony, breton, cinieri, descoeur, dive, forissier, genevard,
                // MoDem
                babary, berta, bolo, brocard, essayan,
                // PCF
                music, music2, music3, music4, music5,
                // Horizons
                dhersin, kox, leroy, marcangeli,
                // LIOT
                acquaviva, colombani, pancher, taupiac,
            ]

            await tx.insert(models.person).values(allPersons)
            console.log(`  → ${allPersons.length} persons seeded.`)


            // ================================================================
            // Person-Role assignments
            // ================================================================
            console.log("Seeding person-role assignments...")

            const depute2024 = (person: typeof macron) => ({
                id: generateId(), idPerson: person.id, idRole: roleDepute.id,
                startingAt: "2024-07-08", createdAt: now,
            })

            const personRoles = [
                // Macron
                { id: generateId(), idPerson: macron.id, idRole: rolePresident.id, startingAt: "2017-05-14", createdAt: now },
                { id: generateId(), idPerson: macron.id, idRole: roleMinEconomie.id, startingAt: "2014-08-26", endingAt: "2016-08-30", createdAt: now },
                // Attal
                { id: generateId(), idPerson: attal.id, idRole: rolePM.id, startingAt: "2024-01-09", endingAt: "2024-09-05", createdAt: now },
                { id: generateId(), idPerson: attal.id, idRole: roleMinEducation.id, startingAt: "2023-07-20", endingAt: "2024-01-09", createdAt: now },
                depute2024(attal),
                // Braun-Pivet
                { id: generateId(), idPerson: braunPivet.id, idRole: rolePresidentAN.id, startingAt: "2022-06-28", createdAt: now },
                depute2024(braunPivet),
                // Borne
                { id: generateId(), idPerson: borne.id, idRole: rolePM.id, startingAt: "2022-05-16", endingAt: "2024-01-09", createdAt: now },
                { id: generateId(), idPerson: borne.id, idRole: roleMinistre.id, startingAt: "2019-07-16", endingAt: "2022-05-16", createdAt: now },
                depute2024(borne),
                // Hollande
                { id: generateId(), idPerson: hollande.id, idRole: rolePresident.id, startingAt: "2012-05-15", endingAt: "2017-05-14", createdAt: now },
                depute2024(hollande),
                // Le Pen
                depute2024(lePen),
                { id: generateId(), idPerson: lePen.id, idRole: roleDepEuropeen.id, startingAt: "2004-06-13", endingAt: "2017-06-18", createdAt: now },
                // Mélenchon
                depute2024(melenchon),
                { id: generateId(), idPerson: melenchon.id, idRole: roleSenateur.id, startingAt: "2004-09-26", endingAt: "2010-03-21", createdAt: now },
                { id: generateId(), idPerson: melenchon.id, idRole: roleMinistre.id, startingAt: "2000-03-27", endingAt: "2002-05-06", createdAt: now },
                // Darmanin
                { id: generateId(), idPerson: darmanin.id, idRole: roleMinInterieur.id, startingAt: "2020-07-06", endingAt: "2024-09-05", createdAt: now },
                { id: generateId(), idPerson: darmanin.id, idRole: roleMaire.id, startingAt: "2014-03-30", endingAt: "2020-07-06", createdAt: now },
                depute2024(darmanin),
                // Hidalgo
                { id: generateId(), idPerson: hidalgo.id, idRole: roleMaire.id, startingAt: "2014-04-05", createdAt: now },
                // Le Maire
                { id: generateId(), idPerson: leMaire.id, idRole: roleMinEconomie.id, startingAt: "2017-05-17", endingAt: "2024-09-05", createdAt: now },
                // Bayrou
                { id: generateId(), idPerson: bayrou.id, idRole: rolePM.id, startingAt: "2024-12-13", createdAt: now },
                { id: generateId(), idPerson: bayrou.id, idRole: roleMaire.id, startingAt: "2014-04-04", createdAt: now },
                // Édouard Philippe
                { id: generateId(), idPerson: philippeE.id, idRole: rolePM.id, startingAt: "2017-05-15", endingAt: "2020-07-03", createdAt: now },
                { id: generateId(), idPerson: philippeE.id, idRole: roleMaire.id, startingAt: "2020-07-05", createdAt: now },
                // Wauquiez
                depute2024(wauquiez),
                { id: generateId(), idPerson: wauquiez.id, idRole: rolePresidentRegion.id, startingAt: "2016-01-04", createdAt: now },
                // Ciotti
                depute2024(ciotti),
                // Retailleau
                { id: generateId(), idPerson: retailleau.id, idRole: roleMinInterieur.id, startingAt: "2024-09-21", createdAt: now },
                { id: generateId(), idPerson: retailleau.id, idRole: roleSenateur.id, startingAt: "2004-09-26", endingAt: "2024-09-21", createdAt: now },
                // Panot
                depute2024(panot),
                { id: generateId(), idPerson: panot.id, idRole: rolePresidentGroupe.id, startingAt: "2022-06-22", createdAt: now },
                // Vallaud
                depute2024(vallaud),
                { id: generateId(), idPerson: vallaud.id, idRole: rolePresidentGroupe.id, startingAt: "2022-06-28", createdAt: now },
                // Chatelain
                depute2024(chatelain),
                { id: generateId(), idPerson: chatelain.id, idRole: rolePresidentGroupe.id, startingAt: "2022-06-22", createdAt: now },
                // Faure
                depute2024(faure),
                // Fesneau
                { id: generateId(), idPerson: fesneau.id, idRole: roleMinAgriculture.id, startingAt: "2022-05-20", endingAt: "2024-09-05", createdAt: now },
                depute2024(fesneau),
                // Ruffin
                depute2024(ruffin),
                // Coquerel
                depute2024(coquerel),
                // Bompard
                depute2024(bompard),
                // Chenu
                depute2024(chenu),
                // Zemmour – no député role
                // Bardella
                { id: generateId(), idPerson: bardella.id, idRole: roleDepEuropeen.id, startingAt: "2019-07-02", createdAt: now },
                // Rousseau
                depute2024(rousseau),
                // Fabien Roussel (PCF)
                depute2024(music5),
                // Chassaigne
                depute2024(music),
                { id: generateId(), idPerson: music.id, idRole: rolePresidentGroupe.id, startingAt: "2012-06-26", endingAt: "2022-06-22", createdAt: now },
                // Castaner
                depute2024(castaner),
                { id: generateId(), idPerson: castaner.id, idRole: roleMinInterieur.id, startingAt: "2018-10-16", endingAt: "2020-07-06", createdAt: now },
                // Marcangeli
                depute2024(marcangeli),
            ]

            // Add bulk député 2024 for all remaining persons not yet assigned
            const alreadyAssignedIds = new Set(personRoles.map(pr => pr.idPerson))
            // Exclude macron (president not député), hidalgo (maire not députée), leMaire (no longer député),
            // bayrou (PM), philippeE (maire), zemmour (not elected), bardella (MEP not député), retailleau (ministre)
            const excludeFromDepute = new Set([
                macron.id, hidalgo.id, leMaire.id, bayrou.id, philippeE.id,
                zemmour.id, bardella.id, retailleau.id,
            ])
            for (const person of allPersons) {
                if (!alreadyAssignedIds.has(person.id) && !excludeFromDepute.has(person.id)) {
                    personRoles.push(depute2024(person))
                }
            }

            await tx.insert(models.personRole).values(personRoles)
            console.log(`  → ${personRoles.length} person-role assignments seeded.`)


            // ================================================================
            // Person-Party assignments
            // ================================================================
            console.log("Seeding person-party assignments...")

            const partyLink = (person: typeof macron, party: typeof partyRE, startingAt: string, endingAt?: string) => ({
                id: generateId(), idPerson: person.id, idPoliticalParty: party.id,
                startingAt, ...(endingAt ? { endingAt } : {}), createdAt: now,
            })

            const personParties = [
                // Major figures
                partyLink(macron, partyRE, "2016-04-06"),
                partyLink(macron, partyPS, "2006-01-01", "2009-01-01"),
                partyLink(lePen, partyRN, "2011-01-16"),
                partyLink(melenchon, partyLFI, "2016-02-10"),
                partyLink(melenchon, partyPS, "1976-01-01", "2008-11-01"),
                partyLink(darmanin, partyRE, "2017-05-01"),
                partyLink(darmanin, partyLR, "2007-01-01", "2017-05-01"),
                partyLink(hidalgo, partyPS, "1994-01-01"),
                partyLink(borne, partyRE, "2017-01-01"),
                partyLink(leMaire, partyRE, "2017-05-01"),
                partyLink(leMaire, partyLR, "2002-01-01", "2017-05-01"),
                partyLink(rousseau, partyEELV, "2011-01-01"),
                partyLink(bardella, partyRN, "2012-01-01"),
                partyLink(zemmour, partyR, "2021-11-30"),
                partyLink(attal, partyRE, "2016-11-01"),
                partyLink(hollande, partyPS, "1979-01-01"),
                partyLink(braunPivet, partyRE, "2017-01-01"),
                partyLink(panot, partyLFI, "2017-01-01"),
                partyLink(wauquiez, partyLR, "2004-01-01"),
                partyLink(chatelain, partyEELV, "2014-01-01"),
                partyLink(vallaud, partyPS, "2000-01-01"),
                partyLink(ciotti, partyLR, "1994-01-01"),
                partyLink(ciotti, partyUDR, "2024-06-11"),
                partyLink(faure, partyPS, "1994-01-01"),
                partyLink(fesneau, partyMoDem, "2010-01-01"),
                partyLink(ruffin, partyLFI, "2016-01-01"),
                partyLink(coquerel, partyLFI, "2012-01-01"),
                partyLink(bompard, partyLFI, "2014-01-01"),
                partyLink(chenu, partyRN, "2014-01-01"),
                partyLink(bayrou, partyMoDem, "2007-11-30"),
                partyLink(philippeE, partyHorizons, "2021-10-09"),
                partyLink(philippeE, partyLR, "2002-01-01", "2017-05-01"),
                partyLink(retailleau, partyLR, "1998-01-01"),

                // RN députés
                ...([allisio, amrani, audouy, baubry, bilde, cabrolier, catteau, chudeau, dalloz, delmotte,
                    falcon, gaultierDM, grenon, hirsch, jacobelli, jaouen, lepers, marchio, marechal, meurin,
                ] as typeof macron[]).map(person => partyLink(person, partyRN, "2022-01-01")),

                // LFI députés
                ...([autain, bernalicis, boyard, corbiere, dufour, garrido, guiraud, knaebel, lachaud, legrain,
                    mathieu, obono, piquemal, portes, ratenon, rome, simonnet,
                ] as typeof macron[]).map(person => partyLink(person, partyLFI, "2017-01-01")),

                // PS députés
                ...([batho, brun, carvounas, delaporte, descamps, dufeu, falorni, jumel, keloua, leseney, naillet, ostermann,
                ] as typeof macron[]).map(person => partyLink(person, partyPS, "2010-01-01")),

                // EELV députés
                ...([arenas, balanant, benarroche, bilongo, bourouaha, caron, clouet, delogu, dupont, iordanoff, jerretie,
                ] as typeof macron[]).map(person => partyLink(person, partyEELV, "2015-01-01")),

                // RE députés
                ...([adam, alauzet, amadou, amiot, ardouin, atallah, bachelier, berete, biais, bordes,
                    briquet, castaner, cazebonne, cesarini, colomb, desarnaud, elimas,
                ] as typeof macron[]).map(person => partyLink(person, partyRE, "2017-01-01")),

                // LR députés
                ...([abad, bazin, becht, bony, breton, cinieri, descoeur, dive, forissier, genevard,
                ] as typeof macron[]).map(person => partyLink(person, partyLR, "2010-01-01")),

                // MoDem députés
                ...([babary, berta, bolo, brocard, essayan,
                ] as typeof macron[]).map(person => partyLink(person, partyMoDem, "2012-01-01")),

                // PCF députés
                ...([music, music2, music3, music4, music5,
                ] as typeof macron[]).map(person => partyLink(person, partyPCF, "2000-01-01")),

                // Horizons députés
                ...([dhersin, kox, leroy, marcangeli,
                ] as typeof macron[]).map(person => partyLink(person, partyHorizons, "2021-10-01")),

                // LIOT députés
                ...([acquaviva, colombani, pancher, taupiac,
                ] as typeof macron[]).map(person => partyLink(person, partyLiot, "2017-01-01")),
            ]

            await tx.insert(models.personPoliticalParty).values(personParties)
            console.log(`  → ${personParties.length} person-party assignments seeded.`)


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
            const pubLObs = { id: generateId(), name: "L'Obs", websiteUrl: "https://www.nouvelobs.com", createdAt: now }
            const pubLePoint = { id: generateId(), name: "Le Point", websiteUrl: "https://www.lepoint.fr", createdAt: now }
            const pubLesEchos = { id: generateId(), name: "Les Échos", websiteUrl: "https://www.lesechos.fr", createdAt: now }
            const pubLaCroix = { id: generateId(), name: "La Croix", websiteUrl: "https://www.la-croix.com", createdAt: now }
            const pubPublicSenat = { id: generateId(), name: "Public Sénat", websiteUrl: "https://www.publicsenat.fr", createdAt: now }
            const pubOuestFrance = { id: generateId(), name: "Ouest-France", websiteUrl: "https://www.ouest-france.fr", createdAt: now }
            const pub20Minutes = { id: generateId(), name: "20 Minutes", websiteUrl: "https://www.20minutes.fr", createdAt: now }
            const pubLExpress = { id: generateId(), name: "L'Express", websiteUrl: "https://www.lexpress.fr", createdAt: now }
            const pubHuffPost = { id: generateId(), name: "HuffPost", websiteUrl: "https://www.huffingtonpost.fr", createdAt: now }

            await tx.insert(models.publisher).values([
                pubLeMonde, pubFigaro, pubLiberation, pubFranceInfo, pubMediapart, pubBFMTV,
                pubLObs, pubLePoint, pubLesEchos, pubLaCroix, pubPublicSenat, pubOuestFrance,
                pub20Minutes, pubLExpress, pubHuffPost,
            ])


            // ================================================================
            // Facts
            // ================================================================
            console.log("Seeding facts...")

            const factMacronRetraites = {
                id: generateId(), idPerson: macron.id,
                title: "Réforme des retraites 2023",
                description: "Emmanuel Macron promulgue la réforme des retraites repoussant l'âge légal de départ de 62 à 64 ans, malgré une forte contestation sociale et l'utilisation de l'article 49.3 par le gouvernement.",
                occurredAt: "2023-04-15",
                isFlagged: false, createdAt: now,
            }
            const factMacronDissolution = {
                id: generateId(), idPerson: macron.id,
                title: "Dissolution de l'Assemblée nationale",
                description: "Après la victoire du Rassemblement National aux élections européennes, Emmanuel Macron annonce la dissolution de l'Assemblée nationale, provoquant des élections législatives anticipées.",
                occurredAt: "2024-06-09",
                isFlagged: false, createdAt: now,
            }
            const factMacronElection2017 = {
                id: generateId(), idPerson: macron.id,
                title: "Élection présidentielle de 2017",
                description: "Emmanuel Macron est élu président de la République française avec 66,1% des voix au second tour face à Marine Le Pen, devenant le plus jeune président de la Ve République.",
                occurredAt: "2017-05-07",
                isFlagged: false, createdAt: now,
            }
            const factMacronReelection2022 = {
                id: generateId(), idPerson: macron.id,
                title: "Réélection présidentielle de 2022",
                description: "Emmanuel Macron est réélu président de la République avec 58,55% des voix au second tour, de nouveau face à Marine Le Pen, dans un contexte de forte abstention.",
                occurredAt: "2022-04-24",
                isFlagged: false, createdAt: now,
            }
            const factMacronBayrou = {
                id: generateId(), idPerson: macron.id,
                title: "Nomination de François Bayrou à Matignon",
                description: "Après la chute du gouvernement Barnier par une motion de censure, Emmanuel Macron nomme François Bayrou Premier ministre, le quatrième de son second quinquennat.",
                occurredAt: "2024-12-13",
                isFlagged: false, createdAt: now,
            }
            const factLePenProces = {
                id: generateId(), idPerson: lePen.id,
                title: "Procès des assistants parlementaires européens",
                description: "Marine Le Pen est jugée dans l'affaire des emplois présumés fictifs d'assistants parlementaires du FN au Parlement européen. Le parquet requiert une peine de cinq ans d'inéligibilité.",
                occurredAt: "2024-11-13",
                isFlagged: false, createdAt: now,
            }
            const factLePenPresidentielle2022 = {
                id: generateId(), idPerson: lePen.id,
                title: "Second tour présidentielle 2022",
                description: "Marine Le Pen accède pour la deuxième fois au second tour de l'élection présidentielle, recueillant 41,45% des voix face à Emmanuel Macron, améliorant significativement son score de 2017.",
                occurredAt: "2022-04-24",
                isFlagged: false, createdAt: now,
            }
            const factMelenchonNUPES = {
                id: generateId(), idPerson: melenchon.id,
                title: "Création de la NUPES",
                description: "Jean-Luc Mélenchon initie la création de la Nouvelle Union Populaire Écologique et Sociale (NUPES), alliance de gauche réunissant LFI, le PS, EELV et le PCF pour les législatives de 2022.",
                occurredAt: "2022-05-01",
                isFlagged: false, createdAt: now,
            }
            const factMelenchonPresidentielle = {
                id: generateId(), idPerson: melenchon.id,
                title: "Troisième candidature présidentielle",
                description: "Jean-Luc Mélenchon obtient 21,95% des voix au premier tour de l'élection présidentielle 2022, échouant de peu à se qualifier pour le second tour, terminant troisième derrière Le Pen.",
                occurredAt: "2022-04-10",
                isFlagged: false, createdAt: now,
            }
            const factDarmaninLoiImmigration = {
                id: generateId(), idPerson: darmanin.id,
                title: "Loi immigration",
                description: "Gérald Darmanin porte le projet de loi pour contrôler l'immigration et améliorer l'intégration, texte controversé adopté après de vifs débats parlementaires et des concessions à la droite.",
                occurredAt: "2023-12-19",
                isFlagged: false, createdAt: now,
            }
            const factDarmaninJO = {
                id: generateId(), idPerson: darmanin.id,
                title: "Sécurité des JO 2024",
                description: "En tant que ministre de l'Intérieur, Gérald Darmanin supervise le dispositif de sécurité exceptionnel déployé pour les Jeux olympiques de Paris 2024, mobilisant 45 000 policiers et gendarmes.",
                occurredAt: "2024-07-26",
                isFlagged: false, createdAt: now,
            }
            const factHidalgoJO2024 = {
                id: generateId(), idPerson: hidalgo.id,
                title: "Jeux olympiques de Paris 2024",
                description: "En tant que maire de Paris, Anne Hidalgo supervise l'organisation des Jeux olympiques et paralympiques de Paris 2024, incluant la cérémonie d'ouverture sur la Seine.",
                occurredAt: "2024-07-26",
                isFlagged: false, createdAt: now,
            }
            const factHidalgoCandidature = {
                id: generateId(), idPerson: hidalgo.id,
                title: "Candidature présidentielle 2022",
                description: "Anne Hidalgo se présente à l'élection présidentielle de 2022 sous les couleurs du Parti Socialiste, obtenant 1,75% des voix au premier tour, le plus bas score historique du PS.",
                occurredAt: "2022-04-10",
                isFlagged: false, createdAt: now,
            }
            const factBorneNominationPM = {
                id: generateId(), idPerson: borne.id,
                title: "Nomination comme Première ministre",
                description: "Élisabeth Borne est nommée Première ministre par Emmanuel Macron, devenant la deuxième femme à occuper ce poste dans l'histoire de la Ve République, après Édith Cresson.",
                occurredAt: "2022-05-16",
                isFlagged: false, createdAt: now,
            }
            const factBorne49_3 = {
                id: generateId(), idPerson: borne.id,
                title: "Recours au 49.3 pour les retraites",
                description: "La Première ministre Élisabeth Borne engage la responsabilité du gouvernement sur la réforme des retraites via l'article 49.3, évitant un vote à l'Assemblée nationale jugé incertain.",
                occurredAt: "2023-03-16",
                isFlagged: false, createdAt: now,
            }
            const factLeMaireDette = {
                id: generateId(), idPerson: leMaire.id,
                title: "Alerte sur la dette publique",
                description: "Bruno Le Maire tire la sonnette d'alarme sur l'état des finances publiques françaises, avec une dette publique dépassant les 3 000 milliards d'euros et un déficit supérieur aux prévisions.",
                occurredAt: "2024-03-20",
                isFlagged: false, createdAt: now,
            }
            const factLeMairePlanRelance = {
                id: generateId(), idPerson: leMaire.id,
                title: "Plan de relance France 2030",
                description: "Bruno Le Maire présente le plan d'investissement France 2030 doté de 54 milliards d'euros, visant à réindustrialiser la France et investir dans les technologies d'avenir.",
                occurredAt: "2021-10-12",
                isFlagged: false, createdAt: now,
            }
            const factZemmourCondamnation = {
                id: generateId(), idPerson: zemmour.id,
                title: "Condamnation pour provocation à la haine raciale",
                description: "Éric Zemmour est condamné pour provocation à la haine raciale après ses propos sur les mineurs isolés étrangers tenus sur CNews, une condamnation confirmée en appel.",
                occurredAt: "2022-01-17",
                isFlagged: false, createdAt: now,
            }
            const factZemmourCandidature = {
                id: generateId(), idPerson: zemmour.id,
                title: "Candidature présidentielle 2022",
                description: "Éric Zemmour se présente à l'élection présidentielle sous l'étiquette Reconquête, obtenant 7,07% des voix au premier tour après une campagne centrée sur l'immigration et l'identité.",
                occurredAt: "2022-04-10",
                isFlagged: false, createdAt: now,
            }
            const factRousseau49_3 = {
                id: generateId(), idPerson: rousseau.id,
                title: "Opposition au 49.3 sur les retraites",
                description: "Sandrine Rousseau participe activement à l'opposition parlementaire contre l'utilisation du 49.3 par le gouvernement pour faire adopter la réforme des retraites sans vote.",
                occurredAt: "2023-03-16",
                isFlagged: false, createdAt: now,
            }
            const factBardellaEuropeennes = {
                id: generateId(), idPerson: bardella.id,
                title: "Victoire aux élections européennes 2024",
                description: "Jordan Bardella mène la liste du Rassemblement National aux élections européennes de 2024, obtenant plus de 31% des voix, un score historique qui déclenche la dissolution de l'Assemblée nationale.",
                occurredAt: "2024-06-09",
                isFlagged: false, createdAt: now,
            }
            const factBardellaPM = {
                id: generateId(), idPerson: bardella.id,
                title: "Candidature au poste de Premier ministre",
                description: "Jordan Bardella est désigné comme candidat du RN au poste de Premier ministre pour les élections législatives anticipées de 2024, une première pour un président du RN.",
                occurredAt: "2024-06-12",
                isFlagged: false, createdAt: now,
            }
            const factAttalPM = {
                id: generateId(), idPerson: attal.id,
                title: "Plus jeune Premier ministre de la Ve République",
                description: "Gabriel Attal est nommé Premier ministre à 34 ans, devenant le plus jeune chef de gouvernement de l'histoire de la Ve République française.",
                occurredAt: "2024-01-09",
                isFlagged: false, createdAt: now,
            }
            const factAttalLegislatives = {
                id: generateId(), idPerson: attal.id,
                title: "Campagne législatives anticipées 2024",
                description: "Gabriel Attal mène la campagne du camp présidentiel aux élections législatives anticipées, défendant le bilan du gouvernement face à la montée du RN et du Nouveau Front Populaire.",
                occurredAt: "2024-06-20",
                isFlagged: false, createdAt: now,
            }
            const factHollandeDepute = {
                id: generateId(), idPerson: hollande.id,
                title: "Retour à l'Assemblée nationale",
                description: "François Hollande, ancien président de la République, est élu député de Corrèze lors des élections législatives anticipées de 2024, un retour inédit pour un ex-chef de l'État.",
                occurredAt: "2024-07-07",
                isFlagged: false, createdAt: now,
            }
            const factHollandePresidentielle2012 = {
                id: generateId(), idPerson: hollande.id,
                title: "Élection présidentielle 2012",
                description: "François Hollande est élu président de la République française avec 51,64% des voix au second tour face à Nicolas Sarkozy, devenant le premier président socialiste depuis 1995.",
                occurredAt: "2012-05-06",
                isFlagged: false, createdAt: now,
            }
            const factBraunPivetAN = {
                id: generateId(), idPerson: braunPivet.id,
                title: "Première femme présidente de l'Assemblée nationale",
                description: "Yaël Braun-Pivet est élue présidente de l'Assemblée nationale, devenant la première femme à occuper ce poste, quatrième personnage de l'État.",
                occurredAt: "2022-06-28",
                isFlagged: false, createdAt: now,
            }
            const factBraunPivetReelection = {
                id: generateId(), idPerson: braunPivet.id,
                title: "Réélection controversée au perchoir",
                description: "Yaël Braun-Pivet est réélue présidente de l'Assemblée nationale en juillet 2024 malgré les revendications du Nouveau Front Populaire qui avait obtenu le plus de sièges aux législatives.",
                occurredAt: "2024-07-18",
                isFlagged: false, createdAt: now,
            }
            const factPanotMotionCensure = {
                id: generateId(), idPerson: panot.id,
                title: "Dépôt d'une motion de censure contre le gouvernement Barnier",
                description: "Mathilde Panot, présidente du groupe LFI, dépose une motion de censure contre le gouvernement de Michel Barnier, adoptée avec les voix du RN provoquant la chute du gouvernement.",
                occurredAt: "2024-12-04",
                isFlagged: false, createdAt: now,
            }
            const factPanotPresidenteGroupe = {
                id: generateId(), idPerson: panot.id,
                title: "Élue présidente du groupe LFI",
                description: "Mathilde Panot, à 32 ans, est élue présidente du groupe La France Insoumise à l'Assemblée nationale, succédant à Jean-Luc Mélenchon qui n'avait pas été candidat à sa réélection.",
                occurredAt: "2022-06-22",
                isFlagged: false, createdAt: now,
            }
            const factWauquiezGroupe = {
                id: generateId(), idPerson: wauquiez.id,
                title: "Retour à l'Assemblée et présidence du groupe DR",
                description: "Laurent Wauquiez est élu député et prend la présidence du groupe Droite Républicaine à l'Assemblée nationale, s'imposant comme une figure centrale de la droite parlementaire.",
                occurredAt: "2024-07-08",
                isFlagged: false, createdAt: now,
            }
            const factCiottiRN = {
                id: generateId(), idPerson: ciotti.id,
                title: "Alliance avec le Rassemblement National",
                description: "Éric Ciotti, président des Républicains, annonce une alliance avec le RN pour les législatives anticipées, provoquant une crise majeure au sein de LR et son exclusion du parti.",
                occurredAt: "2024-06-11",
                isFlagged: false, createdAt: now,
            }
            const factVallaudNFP = {
                id: generateId(), idPerson: vallaud.id,
                title: "Négociateur du Nouveau Front Populaire",
                description: "Boris Vallaud joue un rôle clé dans les négociations du Nouveau Front Populaire, l'alliance de gauche formée en réponse à la dissolution, unifiant PS, LFI, EELV et PCF.",
                occurredAt: "2024-06-14",
                isFlagged: false, createdAt: now,
            }
            const factBayrouPM = {
                id: generateId(), idPerson: bayrou.id,
                title: "Nomination au poste de Premier ministre",
                description: "François Bayrou est nommé Premier ministre par Emmanuel Macron après la censure du gouvernement Barnier, devenant le premier leader centriste à Matignon sous la Ve République.",
                occurredAt: "2024-12-13",
                isFlagged: false, createdAt: now,
            }
            const factBayrouCensure = {
                id: generateId(), idPerson: bayrou.id,
                title: "Menace de motion de censure",
                description: "François Bayrou fait face à une menace de motion de censure de la gauche dès sa prise de fonction, illustrant l'instabilité parlementaire de la XVIIe législature.",
                occurredAt: "2025-01-15",
                isFlagged: false, createdAt: now,
            }
            const factPhilippeCandidature = {
                id: generateId(), idPerson: philippeE.id,
                title: "Déclaration de candidature présidentielle 2027",
                description: "Édouard Philippe annonce officiellement sa candidature à l'élection présidentielle de 2027, se positionnant comme candidat du centre-droit avec son parti Horizons.",
                occurredAt: "2025-02-01",
                isFlagged: false, createdAt: now,
            }
            const factRetailleauInterieur = {
                id: generateId(), idPerson: retailleau.id,
                title: "Nomination au ministère de l'Intérieur",
                description: "Bruno Retailleau est nommé ministre de l'Intérieur dans le gouvernement Barnier, marquant un virage sécuritaire avec ses positions fermes sur l'immigration et l'ordre public.",
                occurredAt: "2024-09-21",
                isFlagged: false, createdAt: now,
            }
            const factRuffinRupture = {
                id: generateId(), idPerson: ruffin.id,
                title: "Rupture avec La France Insoumise",
                description: "François Ruffin consomme sa rupture avec LFI et Jean-Luc Mélenchon, critiquant la stratégie du mouvement et se positionnant comme candidat indépendant à gauche.",
                occurredAt: "2024-06-15",
                isFlagged: false, createdAt: now,
            }
            const factCoquerelFinances = {
                id: generateId(), idPerson: coquerel.id,
                title: "Présidence de la commission des finances",
                description: "Éric Coquerel est élu président de la commission des finances de l'Assemblée nationale, une position stratégique pour le groupe LFI dans le contrôle budgétaire.",
                occurredAt: "2022-06-30",
                isFlagged: false, createdAt: now,
            }
            const factBoyardHanouna = {
                id: generateId(), idPerson: boyard.id,
                title: "Altercation sur le plateau de TPMP",
                description: "Louis Boyard, plus jeune député de l'Assemblée, est au cœur d'une violente altercation verbale avec Cyril Hanouna sur le plateau de Touche Pas à Mon Poste, provoquant un tollé médiatique.",
                occurredAt: "2022-11-10",
                isFlagged: false, createdAt: now,
            }
            const factCastaner = {
                id: generateId(), idPerson: castaner.id,
                title: "Ancien ministre de l'Intérieur",
                description: "Christophe Castaner, ancien ministre de l'Intérieur pendant la crise des gilets jaunes, est réélu député et continue son engagement au sein de la majorité présidentielle.",
                occurredAt: "2024-07-07",
                isFlagged: false, createdAt: now,
            }
            const factChassaigneDoyen = {
                id: generateId(), idPerson: music.id,
                title: "Doyen de l'Assemblée nationale",
                description: "André Chassaigne, député communiste du Puy-de-Dôme depuis 2002, devient le doyen d'âge de l'Assemblée nationale, présidant la séance inaugurale de la XVIIe législature.",
                occurredAt: "2024-07-08",
                isFlagged: false, createdAt: now,
            }
            const factRousselPresidentielle = {
                id: generateId(), idPerson: music5.id,
                title: "Candidature présidentielle PCF",
                description: "Fabien Roussel se présente à l'élection présidentielle de 2022 sous l'étiquette du PCF, obtenant 2,28% des voix avec une campagne axée sur le pouvoir d'achat et la laïcité.",
                occurredAt: "2022-04-10",
                isFlagged: false, createdAt: now,
            }
            const factFesneauAgriculture = {
                id: generateId(), idPerson: fesneau.id,
                title: "Crise agricole et négociations",
                description: "Marc Fesneau, ministre de l'Agriculture, gère la crise agricole de 2024 avec les manifestations d'agriculteurs bloquant les autoroutes, négociant des mesures de soutien au secteur.",
                occurredAt: "2024-01-25",
                isFlagged: false, createdAt: now,
            }

            const allFacts = [
                factMacronRetraites, factMacronDissolution, factMacronElection2017, factMacronReelection2022, factMacronBayrou,
                factLePenProces, factLePenPresidentielle2022,
                factMelenchonNUPES, factMelenchonPresidentielle,
                factDarmaninLoiImmigration, factDarmaninJO,
                factHidalgoJO2024, factHidalgoCandidature,
                factBorneNominationPM, factBorne49_3,
                factLeMaireDette, factLeMairePlanRelance,
                factZemmourCondamnation, factZemmourCandidature,
                factRousseau49_3,
                factBardellaEuropeennes, factBardellaPM,
                factAttalPM, factAttalLegislatives,
                factHollandeDepute, factHollandePresidentielle2012,
                factBraunPivetAN, factBraunPivetReelection,
                factPanotMotionCensure, factPanotPresidenteGroupe,
                factWauquiezGroupe,
                factCiottiRN,
                factVallaudNFP,
                factBayrouPM, factBayrouCensure,
                factPhilippeCandidature,
                factRetailleauInterieur,
                factRuffinRupture,
                factCoquerelFinances,
                factBoyardHanouna,
                factCastaner,
                factChassaigneDoyen,
                factRousselPresidentielle,
                factFesneauAgriculture,
            ]

            await tx.insert(models.fact).values(allFacts)
            console.log(`  → ${allFacts.length} facts seeded.`)


            // ================================================================
            // Tags
            // ================================================================
            console.log("Seeding tags...")
            const tagLegislation = { id: generateId(), label: "Législation", createdAt: now }
            const tagPolitique = { id: generateId(), label: "Politique", createdAt: now }
            const tagElection = { id: generateId(), label: "Élection", createdAt: now }
            const tagJustice = { id: generateId(), label: "Justice", createdAt: now }
            const tagEvenement = { id: generateId(), label: "Événement", createdAt: now }
            const tagEconomie = { id: generateId(), label: "Économie", createdAt: now }
            const tagMedias = { id: generateId(), label: "Médias", createdAt: now }
            const tagSocial = { id: generateId(), label: "Social", createdAt: now }
            const tagSecurite = { id: generateId(), label: "Sécurité", createdAt: now }
            const tagImmigration = { id: generateId(), label: "Immigration", createdAt: now }
            const tagInstitutionnel = { id: generateId(), label: "Institutionnel", createdAt: now }
            const tagEnvironnement = { id: generateId(), label: "Environnement", createdAt: now }
            const tagInternational = { id: generateId(), label: "International", createdAt: now }
            const tagControverse = { id: generateId(), label: "Controverse", createdAt: now }
            const tagPresidentielle = { id: generateId(), label: "Présidentielle", createdAt: now }
            const tagAssembleeNationale = { id: generateId(), label: "Assemblée nationale", createdAt: now }
            const tagSport = { id: generateId(), label: "Sport", createdAt: now }
            const tagAgriculture = { id: generateId(), label: "Agriculture", createdAt: now }
            const tagBudget = { id: generateId(), label: "Budget", createdAt: now }
            const tagPartis = { id: generateId(), label: "Partis politiques", createdAt: now }

            const allTags = [
                tagLegislation, tagPolitique, tagElection, tagJustice,
                tagEvenement, tagEconomie, tagMedias, tagSocial,
                tagSecurite, tagImmigration, tagInstitutionnel, tagEnvironnement,
                tagInternational, tagControverse, tagPresidentielle, tagAssembleeNationale,
                tagSport, tagAgriculture, tagBudget, tagPartis,
            ]

            await tx.insert(models.tag).values(allTags)
            console.log(`  → ${allTags.length} tags seeded.`)


            // ================================================================
            // Fact-Tag assignments (multiple tags per fact)
            // ================================================================
            console.log("Seeding fact-tag assignments...")

            const ft = (fact: typeof factMacronRetraites, tag: typeof tagLegislation) => ({
                id: generateId(), idFact: fact.id, idTag: tag.id, createdAt: now,
            })

            const allFactTags = [
                // Macron — Réforme des retraites 2023
                ft(factMacronRetraites, tagLegislation),
                ft(factMacronRetraites, tagSocial),
                ft(factMacronRetraites, tagPolitique),
                ft(factMacronRetraites, tagControverse),
                ft(factMacronRetraites, tagInstitutionnel),
                ft(factMacronRetraites, tagEconomie),
                // Macron — Dissolution
                ft(factMacronDissolution, tagPolitique),
                ft(factMacronDissolution, tagInstitutionnel),
                ft(factMacronDissolution, tagAssembleeNationale),
                ft(factMacronDissolution, tagElection),
                ft(factMacronDissolution, tagControverse),
                // Macron — Élection 2017
                ft(factMacronElection2017, tagElection),
                ft(factMacronElection2017, tagPresidentielle),
                ft(factMacronElection2017, tagPolitique),
                // Macron — Réélection 2022
                ft(factMacronReelection2022, tagElection),
                ft(factMacronReelection2022, tagPresidentielle),
                ft(factMacronReelection2022, tagPolitique),
                // Macron — Nomination Bayrou
                ft(factMacronBayrou, tagPolitique),
                ft(factMacronBayrou, tagInstitutionnel),
                ft(factMacronBayrou, tagPartis),
                // Le Pen — Procès assistants
                ft(factLePenProces, tagJustice),
                ft(factLePenProces, tagControverse),
                ft(factLePenProces, tagInternational),
                ft(factLePenProces, tagPartis),
                // Le Pen — Présidentielle 2022
                ft(factLePenPresidentielle2022, tagElection),
                ft(factLePenPresidentielle2022, tagPresidentielle),
                ft(factLePenPresidentielle2022, tagPolitique),
                // Mélenchon — NUPES
                ft(factMelenchonNUPES, tagPolitique),
                ft(factMelenchonNUPES, tagPartis),
                ft(factMelenchonNUPES, tagElection),
                ft(factMelenchonNUPES, tagAssembleeNationale),
                // Mélenchon — Présidentielle
                ft(factMelenchonPresidentielle, tagElection),
                ft(factMelenchonPresidentielle, tagPresidentielle),
                ft(factMelenchonPresidentielle, tagPolitique),
                // Darmanin — Loi immigration
                ft(factDarmaninLoiImmigration, tagLegislation),
                ft(factDarmaninLoiImmigration, tagImmigration),
                ft(factDarmaninLoiImmigration, tagControverse),
                ft(factDarmaninLoiImmigration, tagSecurite),
                ft(factDarmaninLoiImmigration, tagPolitique),
                ft(factDarmaninLoiImmigration, tagSocial),
                // Darmanin — JO 2024
                ft(factDarmaninJO, tagEvenement),
                ft(factDarmaninJO, tagSecurite),
                ft(factDarmaninJO, tagSport),
                ft(factDarmaninJO, tagInternational),
                // Hidalgo — JO 2024
                ft(factHidalgoJO2024, tagEvenement),
                ft(factHidalgoJO2024, tagSport),
                ft(factHidalgoJO2024, tagInternational),
                ft(factHidalgoJO2024, tagPolitique),
                // Hidalgo — Candidature 2022
                ft(factHidalgoCandidature, tagElection),
                ft(factHidalgoCandidature, tagPresidentielle),
                ft(factHidalgoCandidature, tagPartis),
                // Borne — Nomination PM
                ft(factBorneNominationPM, tagPolitique),
                ft(factBorneNominationPM, tagInstitutionnel),
                // Borne — 49.3 retraites
                ft(factBorne49_3, tagLegislation),
                ft(factBorne49_3, tagInstitutionnel),
                ft(factBorne49_3, tagControverse),
                ft(factBorne49_3, tagSocial),
                ft(factBorne49_3, tagAssembleeNationale),
                ft(factBorne49_3, tagPolitique),
                // Le Maire — Dette publique
                ft(factLeMaireDette, tagEconomie),
                ft(factLeMaireDette, tagBudget),
                ft(factLeMaireDette, tagPolitique),
                // Le Maire — Plan de relance
                ft(factLeMairePlanRelance, tagEconomie),
                ft(factLeMairePlanRelance, tagBudget),
                ft(factLeMairePlanRelance, tagEnvironnement),
                ft(factLeMairePlanRelance, tagInternational),
                // Zemmour — Condamnation
                ft(factZemmourCondamnation, tagJustice),
                ft(factZemmourCondamnation, tagControverse),
                ft(factZemmourCondamnation, tagMedias),
                ft(factZemmourCondamnation, tagImmigration),
                // Zemmour — Candidature 2022
                ft(factZemmourCandidature, tagElection),
                ft(factZemmourCandidature, tagPresidentielle),
                ft(factZemmourCandidature, tagControverse),
                ft(factZemmourCandidature, tagImmigration),
                // Rousseau — Opposition 49.3
                ft(factRousseau49_3, tagLegislation),
                ft(factRousseau49_3, tagSocial),
                ft(factRousseau49_3, tagAssembleeNationale),
                ft(factRousseau49_3, tagControverse),
                // Bardella — Européennes 2024
                ft(factBardellaEuropeennes, tagElection),
                ft(factBardellaEuropeennes, tagInternational),
                ft(factBardellaEuropeennes, tagPolitique),
                ft(factBardellaEuropeennes, tagPartis),
                // Bardella — Candidature PM
                ft(factBardellaPM, tagPolitique),
                ft(factBardellaPM, tagElection),
                ft(factBardellaPM, tagPartis),
                ft(factBardellaPM, tagInstitutionnel),
                // Attal — Plus jeune PM
                ft(factAttalPM, tagPolitique),
                ft(factAttalPM, tagInstitutionnel),
                // Attal — Législatives 2024
                ft(factAttalLegislatives, tagElection),
                ft(factAttalLegislatives, tagAssembleeNationale),
                ft(factAttalLegislatives, tagPolitique),
                ft(factAttalLegislatives, tagPartis),
                // Hollande — Retour député
                ft(factHollandeDepute, tagElection),
                ft(factHollandeDepute, tagAssembleeNationale),
                ft(factHollandeDepute, tagPolitique),
                ft(factHollandeDepute, tagInstitutionnel),
                // Hollande — Présidentielle 2012
                ft(factHollandePresidentielle2012, tagElection),
                ft(factHollandePresidentielle2012, tagPresidentielle),
                ft(factHollandePresidentielle2012, tagPolitique),
                // Braun-Pivet — Présidente AN
                ft(factBraunPivetAN, tagPolitique),
                ft(factBraunPivetAN, tagInstitutionnel),
                ft(factBraunPivetAN, tagAssembleeNationale),
                // Braun-Pivet — Réélection
                ft(factBraunPivetReelection, tagPolitique),
                ft(factBraunPivetReelection, tagInstitutionnel),
                ft(factBraunPivetReelection, tagAssembleeNationale),
                ft(factBraunPivetReelection, tagControverse),
                // Panot — Motion de censure
                ft(factPanotMotionCensure, tagPolitique),
                ft(factPanotMotionCensure, tagInstitutionnel),
                ft(factPanotMotionCensure, tagAssembleeNationale),
                ft(factPanotMotionCensure, tagControverse),
                ft(factPanotMotionCensure, tagPartis),
                // Panot — Présidente groupe LFI
                ft(factPanotPresidenteGroupe, tagPolitique),
                ft(factPanotPresidenteGroupe, tagAssembleeNationale),
                ft(factPanotPresidenteGroupe, tagPartis),
                // Wauquiez — Retour et présidence groupe DR
                ft(factWauquiezGroupe, tagPolitique),
                ft(factWauquiezGroupe, tagAssembleeNationale),
                ft(factWauquiezGroupe, tagElection),
                ft(factWauquiezGroupe, tagPartis),
                // Ciotti — Alliance RN
                ft(factCiottiRN, tagPolitique),
                ft(factCiottiRN, tagPartis),
                ft(factCiottiRN, tagControverse),
                ft(factCiottiRN, tagElection),
                ft(factCiottiRN, tagAssembleeNationale),
                // Vallaud — NFP
                ft(factVallaudNFP, tagPolitique),
                ft(factVallaudNFP, tagPartis),
                ft(factVallaudNFP, tagElection),
                ft(factVallaudNFP, tagAssembleeNationale),
                // Bayrou — PM
                ft(factBayrouPM, tagPolitique),
                ft(factBayrouPM, tagInstitutionnel),
                ft(factBayrouPM, tagPartis),
                // Bayrou — Menace censure
                ft(factBayrouCensure, tagPolitique),
                ft(factBayrouCensure, tagInstitutionnel),
                ft(factBayrouCensure, tagAssembleeNationale),
                ft(factBayrouCensure, tagControverse),
                // Philippe — Candidature 2027
                ft(factPhilippeCandidature, tagPolitique),
                ft(factPhilippeCandidature, tagPresidentielle),
                ft(factPhilippeCandidature, tagElection),
                ft(factPhilippeCandidature, tagPartis),
                // Retailleau — Ministère Intérieur
                ft(factRetailleauInterieur, tagPolitique),
                ft(factRetailleauInterieur, tagSecurite),
                ft(factRetailleauInterieur, tagImmigration),
                ft(factRetailleauInterieur, tagInstitutionnel),
                // Ruffin — Rupture LFI
                ft(factRuffinRupture, tagPolitique),
                ft(factRuffinRupture, tagPartis),
                ft(factRuffinRupture, tagControverse),
                // Coquerel — Commission des finances
                ft(factCoquerelFinances, tagPolitique),
                ft(factCoquerelFinances, tagAssembleeNationale),
                ft(factCoquerelFinances, tagBudget),
                ft(factCoquerelFinances, tagEconomie),
                // Boyard — Hanouna
                ft(factBoyardHanouna, tagMedias),
                ft(factBoyardHanouna, tagControverse),
                ft(factBoyardHanouna, tagPolitique),
                // Castaner — Réélu député
                ft(factCastaner, tagPolitique),
                ft(factCastaner, tagElection),
                ft(factCastaner, tagSecurite),
                ft(factCastaner, tagAssembleeNationale),
                // Chassaigne — Doyen AN
                ft(factChassaigneDoyen, tagPolitique),
                ft(factChassaigneDoyen, tagInstitutionnel),
                ft(factChassaigneDoyen, tagAssembleeNationale),
                // Roussel — Présidentielle PCF
                ft(factRousselPresidentielle, tagElection),
                ft(factRousselPresidentielle, tagPresidentielle),
                ft(factRousselPresidentielle, tagPartis),
                ft(factRousselPresidentielle, tagSocial),
                // Fesneau — Crise agricole
                ft(factFesneauAgriculture, tagAgriculture),
                ft(factFesneauAgriculture, tagEconomie),
                ft(factFesneauAgriculture, tagSocial),
                ft(factFesneauAgriculture, tagPolitique),
                ft(factFesneauAgriculture, tagControverse),
            ]

            await tx.insert(models.factTag).values(allFactTags)
            console.log(`  → ${allFactTags.length} fact-tag assignments seeded.`)


            // ================================================================
            // Sources
            // ================================================================
            console.log("Seeding sources...")

            const src = (idFact: string, idPublisher: string, url: string, title: string, publishedAt: string) => ({
                id: generateId(), idFact, idPublisher, url, title, publishedAt, createdAt: now,
            })

            const allSources = [
                // Macron retraites
                src(factMacronRetraites.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2023/04/15/reforme-des-retraites",
                    "Réforme des retraites : le Conseil constitutionnel valide l'essentiel du texte", "2023-04-14"),
                src(factMacronRetraites.id, pubMediapart.id,
                    "https://www.mediapart.fr/journal/france/2023/03/16/retraites-49-3",
                    "Retraites : Macron passe en force avec le 49.3", "2023-03-16"),
                src(factMacronRetraites.id, pubLesEchos.id,
                    "https://www.lesechos.fr/economie-france/social/reforme-retraites-2023-promulguee",
                    "Réforme des retraites : le texte promulgué après des mois de contestation", "2023-04-15"),
                // Macron dissolution
                src(factMacronDissolution.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/elections/europeennes/dissolution-assemblee-nationale-macron",
                    "Emmanuel Macron annonce la dissolution de l'Assemblée nationale", "2024-06-09"),
                src(factMacronDissolution.id, pubBFMTV.id,
                    "https://www.bfmtv.com/politique/dissolution-assemblee-nationale-macron-2024",
                    "Dissolution : les coulisses de la décision de Macron", "2024-06-10"),
                src(factMacronDissolution.id, pubLExpress.id,
                    "https://www.lexpress.fr/politique/dissolution-macron-pari-risque-2024",
                    "Dissolution : le pari risqué d'Emmanuel Macron", "2024-06-10"),
                // Macron 2017
                src(factMacronElection2017.id, pubFigaro.id,
                    "https://www.lefigaro.fr/elections/presidentielles/2017/05/07/macron-elu",
                    "Présidentielle 2017 : Emmanuel Macron élu président de la République", "2017-05-07"),
                src(factMacronElection2017.id, pubLeMonde.id,
                    "https://www.lemonde.fr/elections/article/2017/05/07/macron-president",
                    "Emmanuel Macron élu plus jeune président de la Ve République", "2017-05-07"),
                // Macron réélection
                src(factMacronReelection2022.id, pubFigaro.id,
                    "https://www.lefigaro.fr/elections/presidentielles/2022/04/24/macron-reelu",
                    "Présidentielle 2022 : Macron réélu avec 58,55% des voix", "2022-04-24"),
                src(factMacronReelection2022.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/elections/presidentielle/macron-reelu-2022-resultats",
                    "Emmanuel Macron réélu : les résultats du second tour", "2022-04-24"),
                // Macron Bayrou
                src(factMacronBayrou.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/12/13/bayrou-nomme-premier-ministre",
                    "François Bayrou nommé Premier ministre après la chute du gouvernement Barnier", "2024-12-13"),
                src(factMacronBayrou.id, pubBFMTV.id,
                    "https://www.bfmtv.com/politique/bayrou-matignon-nomination-macron-2024",
                    "Bayrou à Matignon : Macron fait le choix du centre", "2024-12-13"),
                // Le Pen procès
                src(factLePenProces.id, pubMediapart.id,
                    "https://www.mediapart.fr/journal/france/2024/11/13/le-pen-proces-assistants",
                    "Procès des assistants parlementaires : Marine Le Pen face à la justice", "2024-11-13"),
                src(factLePenProces.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/11/13/le-pen-requisitoire",
                    "Le parquet requiert cinq ans d'inéligibilité contre Marine Le Pen", "2024-11-13"),
                // Le Pen présidentielle 2022
                src(factLePenPresidentielle2022.id, pubFigaro.id,
                    "https://www.lefigaro.fr/elections/presidentielles/2022/04/24/le-pen-second-tour",
                    "Marine Le Pen améliore son score mais échoue à nouveau", "2022-04-24"),
                src(factLePenPresidentielle2022.id, pub20Minutes.id,
                    "https://www.20minutes.fr/politique/presidentielle/le-pen-41-pourcent-2022",
                    "Présidentielle : Marine Le Pen à 41,45%, un score historique pour le RN", "2022-04-24"),
                // Mélenchon NUPES
                src(factMelenchonNUPES.id, pubLiberation.id,
                    "https://www.liberation.fr/politique/elections/nupes-accord-gauche-2022",
                    "NUPES : l'union de la gauche scellée autour de Mélenchon", "2022-05-02"),
                src(factMelenchonNUPES.id, pubLObs.id,
                    "https://www.nouvelobs.com/politique/nupes-creation-gauche-unie-2022",
                    "NUPES : comment Mélenchon a réussi à unir la gauche", "2022-05-03"),
                // Mélenchon présidentielle
                src(factMelenchonPresidentielle.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/elections/presidentielle/melenchon-premier-tour-2022",
                    "Présidentielle 2022 : Mélenchon échoue de peu au second tour", "2022-04-10"),
                // Darmanin loi immigration
                src(factDarmaninLoiImmigration.id, pubFigaro.id,
                    "https://www.lefigaro.fr/politique/loi-immigration-darmanin-2023",
                    "Loi immigration : Darmanin obtient l'adoption de son texte", "2023-12-20"),
                src(factDarmaninLoiImmigration.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/societe/immigration/loi-immigration-adoption",
                    "La loi immigration définitivement adoptée par le Parlement", "2023-12-19"),
                // Darmanin JO
                src(factDarmaninJO.id, pubLeMonde.id,
                    "https://www.lemonde.fr/sport/article/2024/07/26/securite-jo-2024-dispositif",
                    "JO 2024 : le dispositif de sécurité exceptionnel de Darmanin", "2024-07-26"),
                // Hidalgo JO
                src(factHidalgoJO2024.id, pubBFMTV.id,
                    "https://www.bfmtv.com/paris/jo-2024-paris-ceremonie-ouverture",
                    "JO 2024 : la cérémonie d'ouverture sur la Seine éblouit le monde", "2024-07-26"),
                src(factHidalgoJO2024.id, pubOuestFrance.id,
                    "https://www.ouest-france.fr/sport/jo-2024/ceremonie-ouverture-paris-2024-seine",
                    "JO Paris 2024 : une cérémonie d'ouverture inédite sur la Seine", "2024-07-26"),
                // Hidalgo candidature
                src(factHidalgoCandidature.id, pubLeMonde.id,
                    "https://www.lemonde.fr/elections/article/2022/04/10/hidalgo-score-historiquement-bas",
                    "Présidentielle 2022 : Anne Hidalgo obtient un score historiquement bas", "2022-04-10"),
                // Borne PM
                src(factBorneNominationPM.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/politique/elisabeth-borne/nomination-premiere-ministre",
                    "Élisabeth Borne nommée Première ministre", "2022-05-16"),
                src(factBorneNominationPM.id, pubLePoint.id,
                    "https://www.lepoint.fr/politique/elisabeth-borne-premiere-ministre-portrait",
                    "Élisabeth Borne à Matignon : portrait d'une technocrate", "2022-05-16"),
                // Borne 49.3
                src(factBorne49_3.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2023/03/16/borne-49-3-retraites",
                    "Retraites : Borne dégaine le 49.3, la motion de censure échoue de peu", "2023-03-16"),
                src(factBorne49_3.id, pubLiberation.id,
                    "https://www.liberation.fr/politique/retraites-49-3-borne-colere-assemblee-2023",
                    "49.3 sur les retraites : la colère gronde à l'Assemblée et dans la rue", "2023-03-16"),
                // Le Maire dette
                src(factLeMaireDette.id, pubFigaro.id,
                    "https://www.lefigaro.fr/economie/dette-publique-le-maire-alerte-2024",
                    "Bruno Le Maire alerte sur la trajectoire de la dette publique", "2024-03-20"),
                src(factLeMaireDette.id, pubLesEchos.id,
                    "https://www.lesechos.fr/economie-france/budget-fiscalite/dette-3000-milliards-alerte",
                    "La dette publique française dépasse les 3 000 milliards d'euros", "2024-03-20"),
                // Le Maire plan relance
                src(factLeMairePlanRelance.id, pubLesEchos.id,
                    "https://www.lesechos.fr/economie-france/conjoncture/france-2030-plan-investissement",
                    "France 2030 : 54 milliards pour réindustrialiser la France", "2021-10-12"),
                // Zemmour condamnation
                src(factZemmourCondamnation.id, pubMediapart.id,
                    "https://www.mediapart.fr/journal/france/2022/01/17/zemmour-condamnation",
                    "Éric Zemmour condamné pour provocation à la haine raciale", "2022-01-17"),
                // Zemmour candidature
                src(factZemmourCandidature.id, pubLePoint.id,
                    "https://www.lepoint.fr/presidentielle/zemmour-7-pourcent-premier-tour-2022",
                    "Présidentielle : Zemmour obtient 7,07% au premier tour", "2022-04-10"),
                // Rousseau 49.3
                src(factRousseau49_3.id, pubLiberation.id,
                    "https://www.liberation.fr/politique/retraites/49-3-opposition-assemblee-2023",
                    "49.3 : la colère de l'opposition à l'Assemblée nationale", "2023-03-16"),
                // Bardella européennes
                src(factBardellaEuropeennes.id, pubBFMTV.id,
                    "https://www.bfmtv.com/politique/europeennes-2024-rn-bardella-victoire",
                    "Européennes 2024 : Bardella et le RN largement en tête", "2024-06-09"),
                src(factBardellaEuropeennes.id, pubLeMonde.id,
                    "https://www.lemonde.fr/elections/europeennes/2024/06/09/rn-premier-parti",
                    "Élections européennes : le RN premier parti de France avec plus de 31%", "2024-06-09"),
                // Bardella PM
                src(factBardellaPM.id, pubFigaro.id,
                    "https://www.lefigaro.fr/politique/bardella-candidat-premier-ministre-rn-2024",
                    "Jordan Bardella, candidat du RN pour Matignon", "2024-06-12"),
                // Attal PM
                src(factAttalPM.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/01/09/attal-plus-jeune-premier-ministre",
                    "Gabriel Attal, plus jeune Premier ministre de la Ve République", "2024-01-09"),
                src(factAttalPM.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/politique/gabriel-attal/nomination-premier-ministre-34-ans",
                    "Gabriel Attal nommé Premier ministre à 34 ans", "2024-01-09"),
                // Attal législatives
                src(factAttalLegislatives.id, pubBFMTV.id,
                    "https://www.bfmtv.com/politique/attal-campagne-legislatives-majorite-2024",
                    "Législatives : Attal en première ligne pour défendre la majorité", "2024-06-20"),
                // Hollande député
                src(factHollandeDepute.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/07/07/hollande-elu-depute-correze",
                    "François Hollande élu député en Corrèze, un retour inédit", "2024-07-07"),
                src(factHollandeDepute.id, pubHuffPost.id,
                    "https://www.huffingtonpost.fr/politique/hollande-depute-retour-assemblee-2024",
                    "Hollande à l'Assemblée : le retour surprise de l'ancien président", "2024-07-07"),
                // Hollande 2012
                src(factHollandePresidentielle2012.id, pubLeMonde.id,
                    "https://www.lemonde.fr/elections/article/2012/05/06/hollande-president",
                    "François Hollande élu président de la République", "2012-05-06"),
                // Braun-Pivet AN
                src(factBraunPivetAN.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/politique/braun-pivet-premiere-femme-presidente-assemblee",
                    "Yaël Braun-Pivet, première femme présidente de l'Assemblée nationale", "2022-06-28"),
                // Braun-Pivet réélection
                src(factBraunPivetReelection.id, pubMediapart.id,
                    "https://www.mediapart.fr/journal/france/2024/07/18/braun-pivet-reelue-perchoir-controverse",
                    "Braun-Pivet réélue au perchoir malgré les revendications du NFP", "2024-07-18"),
                // Panot motion de censure
                src(factPanotMotionCensure.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/12/04/motion-censure-barnier-adoptee",
                    "La motion de censure adoptée : le gouvernement Barnier renversé", "2024-12-04"),
                src(factPanotMotionCensure.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/politique/motion-censure-barnier-vote-lfi-rn",
                    "Motion de censure : la coalition inédite LFI-RN fait tomber Barnier", "2024-12-04"),
                // Panot présidente groupe
                src(factPanotPresidenteGroupe.id, pubLiberation.id,
                    "https://www.liberation.fr/politique/panot-elue-presidente-groupe-lfi-2022",
                    "Mathilde Panot élue présidente du groupe LFI à l'Assemblée", "2022-06-22"),
                // Wauquiez
                src(factWauquiezGroupe.id, pubFigaro.id,
                    "https://www.lefigaro.fr/politique/wauquiez-president-groupe-droite-republicaine-2024",
                    "Wauquiez prend la tête du groupe Droite Républicaine", "2024-07-08"),
                // Ciotti
                src(factCiottiRN.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/06/11/ciotti-alliance-rn-crise-lr",
                    "Ciotti annonce une alliance avec le RN, provoquant une crise à LR", "2024-06-11"),
                src(factCiottiRN.id, pubBFMTV.id,
                    "https://www.bfmtv.com/politique/ciotti-exclusion-lr-alliance-rn-2024",
                    "Ciotti exclu de LR après son alliance avec le Rassemblement National", "2024-06-12"),
                // Vallaud NFP
                src(factVallaudNFP.id, pubLObs.id,
                    "https://www.nouvelobs.com/politique/nouveau-front-populaire-negociations-vallaud-2024",
                    "Nouveau Front Populaire : Vallaud au cœur des négociations", "2024-06-14"),
                // Bayrou PM
                src(factBayrouPM.id, pubLeMonde.id,
                    "https://www.lemonde.fr/politique/article/2024/12/13/bayrou-premier-ministre-nomination",
                    "François Bayrou nommé Premier ministre", "2024-12-13"),
                src(factBayrouPM.id, pubFigaro.id,
                    "https://www.lefigaro.fr/politique/bayrou-matignon-centriste-premier-ministre-2024",
                    "Bayrou à Matignon : un centriste à la tête du gouvernement", "2024-12-13"),
                // Bayrou censure
                src(factBayrouCensure.id, pubPublicSenat.id,
                    "https://www.publicsenat.fr/actualites/politique/bayrou-menace-motion-censure-gauche-2025",
                    "Bayrou sous la menace d'une motion de censure de la gauche", "2025-01-15"),
                // Philippe candidature
                src(factPhilippeCandidature.id, pubLePoint.id,
                    "https://www.lepoint.fr/politique/philippe-candidature-presidentielle-2027",
                    "Édouard Philippe se déclare candidat à la présidentielle 2027", "2025-02-01"),
                // Retailleau
                src(factRetailleauInterieur.id, pubFigaro.id,
                    "https://www.lefigaro.fr/politique/retailleau-ministre-interieur-barnier-2024",
                    "Bruno Retailleau nommé à l'Intérieur : un choix de fermeté", "2024-09-21"),
                src(factRetailleauInterieur.id, pubLaCroix.id,
                    "https://www.la-croix.com/france/retailleau-interieur-immigration-securite-2024",
                    "Retailleau à l'Intérieur : immigration et sécurité au programme", "2024-09-22"),
                // Ruffin
                src(factRuffinRupture.id, pubMediapart.id,
                    "https://www.mediapart.fr/journal/france/2024/06/15/ruffin-rupture-lfi-melenchon",
                    "François Ruffin consomme sa rupture avec LFI", "2024-06-15"),
                src(factRuffinRupture.id, pubLiberation.id,
                    "https://www.liberation.fr/politique/ruffin-quitte-lfi-gauche-independante-2024",
                    "Ruffin tourne la page LFI et trace sa route à gauche", "2024-06-16"),
                // Coquerel
                src(factCoquerelFinances.id, pubPublicSenat.id,
                    "https://www.publicsenat.fr/actualites/politique/coquerel-president-commission-finances-2022",
                    "Éric Coquerel élu à la tête de la commission des finances", "2022-06-30"),
                // Boyard
                src(factBoyardHanouna.id, pub20Minutes.id,
                    "https://www.20minutes.fr/medias/boyard-hanouna-tpmp-altercation-2022",
                    "Louis Boyard et Cyril Hanouna : retour sur l'altercation de TPMP", "2022-11-10"),
                src(factBoyardHanouna.id, pubHuffPost.id,
                    "https://www.huffingtonpost.fr/medias/boyard-hanouna-clash-tpmp-2022",
                    "Le clash Boyard-Hanouna secoue la sphère médiatique", "2022-11-11"),
                // Castaner
                src(factCastaner.id, pubOuestFrance.id,
                    "https://www.ouest-france.fr/politique/castaner-reelu-depute-majorite-2024",
                    "Christophe Castaner réélu député dans les Alpes-de-Haute-Provence", "2024-07-07"),
                // Chassaigne
                src(factChassaigneDoyen.id, pubPublicSenat.id,
                    "https://www.publicsenat.fr/actualites/politique/chassaigne-doyen-assemblee-2024",
                    "André Chassaigne, doyen de l'Assemblée, préside la séance inaugurale", "2024-07-08"),
                // Roussel
                src(factRousselPresidentielle.id, pubLObs.id,
                    "https://www.nouvelobs.com/politique/roussel-pcf-presidentielle-2022-bilan",
                    "Fabien Roussel : un candidat PCF qui a bousculé la gauche", "2022-04-11"),
                // Fesneau agriculture
                src(factFesneauAgriculture.id, pubOuestFrance.id,
                    "https://www.ouest-france.fr/economie/agriculture/crise-agricole-fesneau-negociations-2024",
                    "Crise agricole : Fesneau en première ligne face à la colère des agriculteurs", "2024-01-25"),
                src(factFesneauAgriculture.id, pubFranceInfo.id,
                    "https://www.francetvinfo.fr/economie/emploi/metiers/agriculture/crise-agricole-mesures-fesneau",
                    "Crise agricole : les mesures annoncées par Marc Fesneau", "2024-01-26"),
            ]

            await tx.insert(models.source).values(allSources)
            console.log(`  → ${allSources.length} sources seeded.`)


            console.log("Seeding complete!")
        })

    } catch (error) {
        console.log(error)
    }
}

console.log("Seeding starting.")
await seed()

process.exit()
