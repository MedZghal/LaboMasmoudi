import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {catchError, map, startWith, timeout} from 'rxjs/operators';
import {BackendService} from '../backend.service';
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-resultat-modal',
  templateUrl: './resultat-modal.component.html',
  styleUrls: ['./resultat-modal.component.scss']
})
export class ResultatModalComponent implements OnInit {

  ResultatForm: FormGroup;
  loading = false;
  submitted = false;
  action;
  PatientId;

  filteredStates: Observable<any[]>;
  Analyses = [
    {
      analyse:  'ACE',
      description: 'L\'ACE est une protéine qui n\'est normalement pas détectée dans le sang d\'une personne saine. En présence de certains types de cancers, notamment digestifs, l\'ACE peut être produit par les cellules cancéreuses. L\'ACE peut alors être détecté dans le sang, mais il n\'indiquera pas le type de cancer présent.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },
    {
      analyse:    'Acide lactique (lactates)',
      description: ' L\'acide lactique ou lactate (forme ionisée de l\'acide lactique) est produit essentiellement par les muscles, la peau et les globules rouges surtout en situation de manque d\'oxygène. Une accumulation excessive de lactate dans le sang (>5mmol/L) entraine une acidose lactique.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },
    {
      analyse:    'Acide urique',
      description: ' Analyse de l\'acide urique. La concentration d\'acide urique peut être déterminée dans le sang ou dans les urines. A l\'excès, c\'est surtout un symptôme de la goutte, d\'une consommation trop importante d\'alcool ou d\'une insuffisance rénale.'
      ,Conseils :' Examen sanguin nécessitant d\'être strictement à jeun depuis 12h au moins.'
      ,resultet :''
    },
    {
      analyse:    'Albumine',
      description: 'Le dosage de l\'albumine sanguine ou albuminémie est prescrit pour dépister une maladie hépatique ou rénale. Il sert aussi à vérifier la quantité de protéines dans le sang. Le médecin peut demander un dosage de l\'albumine s\'il suspecte une anomalie de la concentration de certains électrolytes, comme le calcium.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },
    {
      analyse:    'Alpha-foetoprotéine (AFP)',
      description: 'L\'analyse de l\'alpha-foetoprotéine. Appelée aussi fétuine, l\'alpha-fœtoprotéine est une protéine naturellement produite par la vésicule vitelline et le foie du fœtus en développement. ... Chez l\'adulte, l\'alpha-fœtoprotéine peut réapparaitre au cours de certaines maladies, la plupart du temps hépatiques ou tumorales.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },
    {
      analyse: 'Apo A / Apo b',
      description: 'Les apolipoprotéines (ou apoprotéines) sont des protéines fabriquées par le foie qui sont impliquées dans le transport des lipides (cholestérol, triglycérides, phospholipides) dans le sang. En effet, les lipides sont insolubles dans le sérum et ne peuvent y circuler qu’en association avec des lipoprotéines (des sortes de « vésicules » ou micelles). Ces lipoprotéines possèdent une partie protéique : les apolipoprotéines.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 12h au moins.'
      ,resultet :''
    },
    {
      analyse: 'CA 125 / CA 15.3 / CA 19.9',
      description: 'L’antigène tumoral 125 (ou CA 125, Cancer Antigen 125) est une protéine produite par une multitude de cellules, et en particulier par les cellules cancéreuses de l’ovaire.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:    'Calcium',
      description: 'Il est possible de mesurer le taux de calcium total, la moitié environ du calcium présent dans l\'organisme étant fixé à des protéines de transport, en particulier l\'albumine, ou le calcium libre (appelée aussi calcium ionisé). Notons que le calcium peut aussi être quantifié dans l\'urine.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:    'Capacité de fixation du fer',
      description: 'Ce dosage de la capacité totale de fixation de la transferrine est le plus souvent prescrit avec le dosage du fer sérique et de la ferritine. ... En cas d\'histoire familiale d\'hémochromatose, le dosage du fer sérique et la capacité totale de fixation de la transferrine seront prescrits.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'Cholestérol total',
      description: 'L\'analyse du cholestérol fera le point sur le taux de cholestérol total, mais aussi sur le LDL-cholestérol, le HDL-cholestérol et le rapport cholestérol total/HDL, qui permet d\'évaluer le risque cardiovasculaire. Une mesure des triglycérides sanguins est effectuée en même temps.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 12h au moins.'
      ,resultet :''
    },{
      analyse:    'Cortisol',
      description: 'Le cortisol est une hormone stéroïde produite à partir du cholestérol et sécrétée par des glandes situées au dessus des reins (les glandes corticosurrénales). Sa sécrétion est sous la dépendance d\'une autre hormone, l\'ACTH produite par l\'hypophyse dans le cerveau (ACTH pour adrénocorticotrophine).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum. Le prélèvement se fait impérativement à 8h du matin. \n' +
        'Il faut éviter tout effort ou stress avant le prélèvement car le taux de cortisol y est sensible. \n' +
        'Penser à signaler un éventuel traitement en cours par des corticoïdes ou par des pilules contraceptives contenant des œstrogènes pouvant interférer avec le dosage.'
    },{
      analyse:     'Créatinine',
      description: 'L\'analyse de la créatinine permet d\'avoir des informations sur le fonctionnement des reins et sur la masse musculaire du patient. La créatinine est produite après la dégradation par les reins de la créatine, une protéine musculaire. Un taux de créatinine élevé est souvent le signe d\'une insuffisance rénale.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:     'CRP = Protéine C réactive',
      description: 'Qu\'est-ce que la protéine C réactive ? La CRP est une protéine synthétisée par le foie après une inflammation aiguë dans l\'organisme. Quand l\'organisme est touché par une inflammation, son taux augmente rapidement dans les heures qui suivent et baisse rapidement dès que l\'affection est soignée.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:      'CTX (Crosslaps)',
      description: 'Ils ne doivent pas être utilisés comme seuls paramètres pour l’application ou la modification d’un traitemenPlus de 90 % de la matrice organique osseuse est constituée de collagène de type I,  principalement synthétisé dans l’ os. Cette matrice est soumise à un processus constant de formation et de résorption. Au cours du métabolisme osseux normal, le collagène de type 1 mature est dégradé en fragments peptidiques qui passent dans le sang et sont éliminés par les reins. Lors d’augmentation physiologique (vieillissement) ou pathologique (ostéoporose, par ex.) de la résorption osseuse, la dégradation du collagène de type I est accélérée, ce qui conduit à une augmentation de la concentration des fragments de collagène dans le sang. Le dosage d’un marqueur de la résorption osseuse permet d’évaluer l’activité des ostéoclastes. La forme isomérisée ? des télopeptides C-terminaux du collagène de type I (?-CTx) est particulièrement intéressante. Les télopeptides isomérisés sont hautement spécifiques de la résorption du collagène de type I présent dans l’ os. Des taux sériques élevés en ?-CTx ont été décrits chez les patients présentant une résorption osseuse importante. Les taux sériques redeviennent normaux sous traitement anti-résorptif. Le dosage des télopeptides C-terminaux dans le sérum est recommandé pour le suivi de la réponse à un traitement de l’ ostéoporose ou d’autres maladies osseuses (traitement aux biphosphonates, traitement hormonal substitutif, etc.). Les  modifications induites par le traitement peuvent ainsi être détectées après quelques semaines.'
      ,Conseils :' Examen sanguin nécessitant d\'être strictement à jeun depuis 8h au moins.'
      ,resultet :''
    },{
      analyse:  'Ecbu',
      description: 'L\'examen cytobactériologique des urines ou ECBU compte parmi les examens les plus prescrits. Il permet de diagnostiquer une infection urinaire et d’identifier le germe responsable afin de recourir au traitement le plus efficace. Son interprétation est simple (l’urine étant normalement stérile) mais dépend aussi de la qualité de sa réalisation.'
      ,Conseils :' La peau et les muqueuses sont recouvertes de microbes invisibles, c’est une flore normale.\n' +
        'Les urines sont stériles, elles ne contiennent pas de microbes.\n' +
        'En cas d’infection urinaire, pour dépister des bactéries, il faut donc éviter toute souillure lors du recueil.'
      ,resultet :'1. De préférence, prélever les premières urines de la journée (mais possible à tout moment)\n' +
        '2. Se laver soigneusement les mains au savon,\n' +
        '3. Faire une toilette intime complète au savon doux,\n' +
        '4. Rincer abondamment à l’eau,\n' +
        '5. N’ouvrir le flacon stérile qu’au dernier moment,\n' +
        '6. Uriner le premier jet dans les toilettes, puis directement dans le flacon,\n' +
        '7. Refermer le flacon avec soin, tout de suite,\n' +
        '8. Identifier le flacon avec votre nom et votre prénom si cela n’a pas été fait par le laboratoire.'
    },{
      analyse:  'Electrophorèse des protéines',
      description: 'Les protéines sériques jouent différentes fonctions de transport et de défense de l\'organisme. L\'électrophorèse des protéines sériques est un examen qui consiste à séparer les protéines circulant dans le sang grâce à un champ électrique.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Estradiol',
      description: 'L\'oestradiol ou estradiol est une hormone « féminine » (un œstrogène). Il est synthétisé en temps normal par les ovaires (et en quantité infime par les testicules chez l\'homme) et par le placenta pendant la grossesse. Dans le sang, l\'oestradiol est transporté par des protéines : la TeBG, la SHBG, et l\'albumine.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Fer sérique',
      description: 'L\'examen de référence pour estimer la quantité de fer dans l\'organisme est l\'examen de la moelle osseuse, à partir de l\'aspiration ou de la biopsie de moelle osseuse. ... Le dosage du fer sérique (dans le sang) peut s\'effectuer par un prélèvement de sang veineux, réalisé généralement au niveau du pli du coude.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'FSH',
      description: 'L\'hormone folliculo-stimulante (FSH) agit sur les ovaires et les testicules. Son dosage, souvent associé à celui d\'autres hormones, est indiqué pour mettre à jour les causes de troubles qui affectent le système reproducteur : infertilité, retard ou précocité de la puberté'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Gastrine',
      description: 'Le dosage de la gastrine aide à l\'exploration des propriétés sécrétoires de l\'estomac. La gastrine est une hormone polypeptique dont la concentration dans le sang s\'élève après la prise d\'un repas. Ce taux peut s\'accroître anormalement en cas de présences de pathologies. Le dosage permet donc de dépister des ulcères ou des affections tumorales. Le taux de gastrine ainsi que les signes cliniques permettent d\'en découvrir la cause ou d\'en définir le traitement.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 8h au moins.'
      ,resultet :''
    },{
      analyse:  'Glycémie',
      description: 'Analyse de la glycémie : le taux de sucre dans le sang. Le dosage de la glycémie, c\'est à dire du taux de sucre dans le sang, est un examen sanguin que le médecin prescrit de manière routinière. Mais il sert surtout à diagnostiquer un éventuel diabète.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 8h au moins.'
      ,resultet :''
    },{
      analyse:  'GP50 : Test d’O’Sullivan',
      description: 'Le test O\'sullivan sert à détecter un éventuel diabète gestationnel (diabète qui apparaît durant la grossesse et disparaît après), en mesurant la glycémie (taux de sucre dans le sang) après ingestion d\'une forte dose de glucose.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Haptoglobine',
      description: 'Cet examen mesure la concentration d\'haptoglobine dans le sang. L\'haptoglobine est une protéine produite par le foie. Son rôle est de fixer l\'hémoglobine libre dans le sang.'
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'HCG',
      description: 'L\'hormone chorionique gonadotrope humaine, ou gonadotropine humaine, plus connue sous le nom d\'HCG, est une hormone produite uniquement au cours d\'une grossesse, d\'abord fabriquée par l\'embryon peu de temps après la conception, puis par un tissu du placenta.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 12h au moins.'
      ,resultet :''
    },{
      analyse:  'HDL / LDL',
      description: 'Le taux de cholestérol HDL est mesuré lors d\'un bilan lipidique pour permettre l\'analyse du cholestérol. Le cholestérol HDL est une lipoprotéine qualifiée de "bon cholestérol" car elle permet de capter l\'excès de cholestérol et de le transporter vers le foie afin qu\'il y soit éliminé.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Hémoglobine glyquée A1c',
      description: 'L\'hémoglobine glyquée (ou HbA1c) est le reflet de la glycémie. Tandis que la glycémie capillaire et la glycémie à jeun sont des instantanés de l\'état glycémique, l\'HbA1c permet, par un dosage sanguin, d\'évaluer l\'équilibre glycémique sur une plus longue période (environ deux à trois mois).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Hépatite A',
      description: 'Il n\'existe pas de test\'examen spécifique des IgG anti-VHA, par conséquent, un examen détectant les anticorps totaux (IgM et IgG) anti-VHA est utilisé. Si l\'examen IgM anti-VHA est négatif, un examen positif pour les anticorps totaux anti-VHA est le marqueur d\'une infection ancienne ou d\'une vaccination.'
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'Hépatite B',
      description: 'Sérologie de l\'hépatite B. L\'hépatite B est une infection virale qui touche le foie. Le virus se transmet par voie sexuelle ou sanguine. ... Le test de dépistage d\'une hépatite B se fait sur une simple prise de sang.'
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'Hépatite C',
      description: 'Le test VHC RIBA est un autre test détectant la présence d\'anticorps dirigés contre le virus de l\'hépatite C. ... Ce test est souvent également utilisé après traitement pour savoir si le virus a été éliminé. • La charge virale ou le test ARN VHC quantitatif mesure la quantité de particules virales présentes dans le sang.'
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'HGPO (Hyperglycémie provoquée)',
      description: 'Hyperglycémie provoquée par voie orale ou test de tolérance au glucose. Le test d\'hyperglycémie provoquée par voie orale consiste à mesurer les taux de variations de la glycémie (taux de sucre dans le sang) après avoir ingéré du glucose.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 8h au moins.\n'
      ,resultet :'D\'autre part le patient devrait prévoir trois heures de disponibilité vu que ce prélèvement consiste en 4 prises à une heure d\'intervalle.'
    },{
      analyse:  'Homocystéine',
      description: 'L’homocystéine est un composé (acide aminé) qui entre dans la fabrication de plusieurs composés de la cellule. L’utilisation de l’homocystéine nécessite la présence des vitamines B6, B12 et acide folique. Parce qu’elle est rapidement utilisée, l’homocystéine est normalement présente en très faible concentration dans les cellules. Un taux élevé d’homocystéine peut donc signaler une déficience dans une de ces vitamines. Ce test fournit les résultats en micromoles d’homocystéine par litre de sang (µmol/L).'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 8h au moins.'
      ,resultet :'ATTENTION : Cette analyse doit se faire obligatoirement au laboratoire et en aucun cas à domicile.'
    },{
      analyse:  'Ionogramme (Na, K, Cl, RA, Protéines)',
      description: 'L\'ionogramme est un examen de laboratoire de biologie médicale qui analyse la concentration en électrolytes d\'un liquide organique (sang, urines, liquide céphalo-rachidien). Ces électrolytes sont des sels, acides, bases, capables de se dissocier en solution pour former des ions.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'LH',
      description: 'Taux de LH trop bas ou trop élevé : l\'analyse des résultats. Des taux élevés de FSH et LH peut être le signe d\'une puberté précoce.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'NFS: Numération - formule sanguine - Plaquettes',
      description: 'L\'hémogramme ou numération de la formule sanguine (NFS) permet de comptabiliser tous les éléments du sang : globules rouges (hématies), globules blancs (leucocytes) et plaquettes. ... Cet examen permet également d\'apprécier des paramètres qualitatifs du sang.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Phosphatases alcalines',
      description: 'Le dosage des phosphatases alcalines est prescrit lorsque le médecin suspecte la présence d\'une maladie du foie ou des os. D\'autres enzymes sont analysées en même temps pour évaluer la fonction hépatique : l\'alanine aminotransférase (ALAT), l\'aspartate aminotransférase (ASAT) et la gamma-glutamyl transférase (γGT).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Phosphore',
      description: 'Le phosphore est un minéral essentiel à de nombreuses réactions cellulaires, en particulier aux mécanismes énergétiques des cellules musculaires. Le phosphore joue aussi un rôle dans la minéralisation du tissu osseux, tout comme le calcium.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Prélèvement cheveux',
      description: 'Au cours de leur croissance, ils se chargent au fur et à mesure, avec les substances introduites dans l’organisme. L’alcool, les drogues mais aussi les toxiques et les polluants se fixent sur nos cheveux.'
      ,Conseils :'Ne pas prendre une douche ou se laver les cheveux pendant 48h.'
      ,resultet :''
    },{
      analyse:  'Prélèvement cuir chevelu',
      description: 'Réaliser un examen capillaire permet d’établir un diagnostic précis de l’état de la chevelure, du cuir chevelu ainsi que des bulbes capillaires. Le but est d’obtenir des réponses claires sur sa situation capillaire globale afin de mettre en place un protocole de traitement personnalisé et adapté à chaque problématique.'
      ,Conseils :'Ne pas prendre une douche ou se laver les cheveux pendant 48h.'
      ,resultet :''
    },{
      analyse:  'Prélèvement de l’ongle',
      description: 'Réaliser un examen capillaire permet d’établir un diagnostic précis de l’état de la chevelure, du cuir chevelu ainsi que des bulbes capillaires. Le but est d’obtenir des réponses claires sur sa situation capillaire globale afin de mettre en place un protocole de traitement personnalisé et adapté à chaque problématique.'
      ,Conseils :'Ne pas appliquer pendant 48 h au moins avant le prélèvement pommade ou vernis ou n\'importe quel autre produit.'
      ,resultet :''
    },{
      analyse:  'Prélèvement vaginal',
      description: 'L’examen bactériologique comprend un examen cytologique, un examen microscopique après coloration  et un examen mycobactériologique sur culture.'
      ,Conseils :' Le prélèvement est effectué de préférence au laboratoire ou doit y être acheminé rapidement. '
      ,resultet :'Il est recommandé de ne pas faire de toilette intime avant le prélèvement.\n' +
        'Il est également préférable de réaliser le prélèvement en dehors des périodes de règles. \n' +
        'Un traitement par antibiotique ou antifongique gêne l\'interprétation de cet examen et doit impérativement être signalé.'
    },{
      analyse:  'Progestérone',
      description: 'La progestérone est une hormone stéroïde qui joue notamment un rôle important lors de l\'installation et de l\'évolution d\'une grossesse. ... Elle est principalement produite par les ovaires (en dehors de la grossesse) et le placenta (dès le deuxième mois, prenant le relais du corps jaune).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Prolactine',
      description: 'La prolactine est une hormone sécrétée par l\'antéhypophyse qui permet principalement le déclenchement et le maintien de la lactation après l\'accouchement. ... Elle agit également sur la sécrétion de progestérone chez la femme, et de testostérone chez l\'homme. Sa sécrétion est principalement régulée par la dopamine.'
      ,Conseils :'Examen sanguin nécessitant d\'être strictement à jeun depuis 8h au moins.'
      ,resultet :''
    },{
      analyse:  'Protéines totales',
      description: 'Les protéines sont en quelques sortes les briques essentielles de nos cellules : elles jouent un rôle dans toutes les réactions de l’organisme.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Protéinurie de Bence Jones (Urines)',
      description: 'Protéinurie de Bence Jones. La protéinurie de Bence Jones consiste à rechercher dans les urines une protéine particulière. Sa présence constitue un argument pour un diagnostic en faveur d\'un myélome ou d\'une maladie de Waldenström. Mais cette protéine peut néanmoins être détectée lors d\'autres maladies.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'

    },{
      analyse:  'PSA/PSA libre',
      description: 'Sa concentration étant proportionnelle au volume de la glande, le taux de PSA représente donc un marqueur essentiel de la santé prostatique. En France, le dosage de l\'antigène prostatique spécifique constitue un examen contribuant, en association avec le toucher rectal, au dépistage du cancer de la prostate.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'PTH',
      description: 'Définition de l\'analyse de la parathormone dans le sang. La parathormone, PTH ou encore hormone parathyroïdienne est une hormone sécrétée par les glandes parathyroïdes. Elle joue un rôle majeur dans la régulation de la répartition du calcium l\'organisme.'
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'Rubéole',
      description: 'Les conséquences d\'une rubéole contractée par le fœtus in utero peuvent être extrêmement graves, surtout lorsque l\'infection survient au cours des premiers mois de grossesse. '
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'Salmonelloses',
      description: 'Les conséquences d\'une rubéole contractée par le fœtus in utero peuvent être extrêmement graves, surtout lorsque l\'infection survient au cours des premiers mois de grossesse. '
      ,Conseils :'Pas de précautions nécessaires pour ce type d\'analyse.'
      ,resultet :''
    },{
      analyse:  'SCC',
      description: 'Le SCC ( sous-fraction du TA4) est un marqueur du carcinome pavimenteux du col de l\'utérus. Il peut être détecté, à des taux plus faibles, dans d\'autres types de carcinomes de l\'épithélium pavimenteux (poumon, oesophage, tête et cou, canal anal et peau).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Scotch test anal',
      description: 'Le SCC ( sous-fraction du TA4) est un marqueur du carcinome pavimenteux du col de l\'utérus. Il peut être détecté, à des taux plus faibles, dans d\'autres types de carcinomes de l\'épithélium pavimenteux (poumon, oesophage, tête et cou, canal anal et peau).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Scotch test cutané',
      description: 'Le scotch-test est une technique de prélèvement très simple : vous appliquez un morceau de papier collant sur la peau, qui va retenir certains parasites, intestinaux ou cutanés.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Selles',
      description: 'Un examen parasitologique des selles (EPS) consiste à analyser les selles pour y rechercher la présence de parasites, en cas de symptômes tels qu\'une diarrhée persistante. Une coproculture peut aussi être effectuée : elle permet de rechercher la présence de bactéries dans les selles.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Spermoculture',
      description: 'L\'infertilité masculine se définit par rapport aux valeurs du spermogramme normal. Cette infertilité peut avoir pour cause des anomalies du sperme ou des spermatozoïdes qui portent sur leur aspect, leur nombre, leur vitalité ou leur mobilité. Doctissimo vous aide à interpréter les résultats du spermogramme. '
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Spermogramme',
      description: 'Un spermogramme est un examen médical au cours duquel sont analysées les différentes caractéristiques du sperme d\'un homme, généralement dans le cadre d\'un bilan d\'infertilité d\'un couple hétérosexuel et dans le suivi de la contraception masculine thermique.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Syphilis',
      description: 'Le diagnostic de la syphilis repose principalement sur des analyses sérologiques (prélèvement sanguin) qui visent à détecter des anticorps anti-tréponème (la bactérie en cause). Plusieurs méthodes sont utilisées, principalement : la VDRL (Venereal Disease Research Laboratory), qui n\'est pas spécifique du tréponème.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'T3 libre (FT3) / T4 libre (FT4)',
      description: 'Plus de 80 % des hormones produites par la thyroïde se fait sous le forme de T4, le reste en T3. ... C\'est cette fraction libre (FT4 et FT3) qui est biologiquement active et qui de fait a une grande importance diagnostique. Le dosage de ces hormones permet de déterminer si la fonction thyroïdienne est normale.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Test HELIKIT',
      description: 'Un flacon contient 75 mg d\'urée 13C. Diagnostic in vivo de l\'infection à Helicobacter pylori, notamment le contrôle de l\'éradication. Se référer aux recommandations officielles nationales pour le traitement des infections à Helicobacter pylori. HELIKIT est un test respiratoire à administration unique.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Testostérone',
      description: 'La testostérone est une hormone stéroïde mâle produite naturellement chez l\'homme et, à un moindre degré, chez la femme. C\'est une hormone androgène, dont le rôle est d\'induire la différentiation et le développement des organes reproducteurs masculins et de la fonction reproductrice chez l\'homme.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Testostérone biodisponible',
      description: 'Testostérone biodisponible. La testostérone est la principale hormone responsable du développement des caractères sexuels secondaires chez l\'homme. La testostérone est fabriquée dans les testicules et un peu par les glandes surrénales.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'TGO (ASAT) / TGP (ALAT)',
      description: 'Les transaminases sont des enzymes localisées à l\'intérieur des cellules. Un taux élevé de transaminases est le reflet d’une lésion cellulaire généralement au niveau du foie, du cœur, des reins ou des muscles. '
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:  'Toxoplasmose',
      description: 'La toxoplasmose est une maladie due à un parasite très répandu, Toxoplasma gondii. ... Si elle est contractée en fin de grossesse, la maladie peut aussi atteindre le fœtus qui naîtra avec une toxoplasmose congénitale (environ un enfant sur 3000).'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'Triglycérides',
      description: 'Le dosage des triglycérides totales est effectué dans le cadre d\'un bilan lipidique, en même temps que le dosage du cholestérol (total, HDL et LDL), pour détecter une dyslipidémie, c\'est-à-dire une anomalie du taux de graisses circulant dans le sang.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'TSH',
      description: 'Définition du dosage de la TSH dans le sang. La TSH (pour thyroid stimulating hormon), aussi appelée hormone thyréostimulante ou thyréostimuline, est une hormone fabriquée par l\'hypophyse, dans le cerveau. Elle régit la sécrétion des hormones T4 et T3 par la thyroïde, une glande située à la base du cou.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'Urée',
      description: 'L\'urée est une molécule qui résulte d\'un processus de dégradation des protéines. C\'est la forme principale d\'élimination des déchets azotés, par l\'urine. C\'est l\'azote des protéines qui, combinée avec des molécules produites par le foie, constitue l\'urée.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'VIH',
      description: 'Un test VIH a pour but de détecter la présence dans le corps humain du virus de l\'immunodéficience humaine responsable du syndrome d\'immunodéficience acquise. Il existe plusieurs types de tests VIH, les principaux utilisent la détection d\'anticorps et/ou d\'antigènes et/ou encore d\'une séquence d\'ARN du VIH. '
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'Virus d’Epstein-Barr : MNI Test, PBD',
      description: 'La recherche d\'anticorps anti-EBV est un test requis pour aider au diagnostic d\'une infection à EBV récente, en cours, ou passée. EBV est un virus du groupe des herpès virus. ... Quand l\'infection a lieu à l\'adolescence, l\'EBV engendre la mononucléose infectieuse (MNI) dans 35-50 % des cas.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'Vitamine D',
      description: 'Le dosage de la vitamine D est prescrit en cas de pathologie (insuffisance hépatique, maladie de Paget, malabsorption) ou traitement (anticonvulsivants) pouvant entraîner une carence en vitamine D. Cet examen est aussi demandé en cas de suspicion de rachitisme, d\'insuffisance rénale ou d\'ostéoporose avérée.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    },{
      analyse:   'Vitesse de sédimentation',
      description: 'Vitesse de sédimentation (VS) La vitesse de sédimentation ou VS est un test qui mesure la vitesse à laquelle les globules rouges chutent dans un tube de sang placé à la verticale. Cet examen permet de détecter une inflammation ou une infection, comme la tuberculose ou une infection urinaire.'
      ,Conseils :'Le jeun est préférable mais non obligatoire'
      ,resultet :'Respecter au minimum un délai de 2h après le début d\'un repas. Éviter les aliments gras avant la prise de sang pour préserver la limpidité du sérum.'
    }
  ];

  constructor(private formBuilder: FormBuilder,
              private authenticationService: BackendService,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.PatientId = data;
  }

  ngOnInit() {

    this.action = false;
    this.ResultatForm = this.formBuilder.group({
      Analyse: ['', [Validators.required]],
      Description: ['']
    });

    this.filteredStates = this.f.Analyse.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.Analyses.slice())
      );
  }

  get f() { return this.ResultatForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ResultatForm.invalid) {
      return;
    }

    this.loading = true;

    let dataParam = new FormData();
    dataParam.append('descp',this.f.Analyse.value);
    dataParam.append('id_patient',this.PatientId);
    dataParam.append('action','set');

    this.authenticationService.post('resultat/',dataParam ).pipe(
      timeout(10000),
      catchError(error => {

        Toast.fire({
          type: 'error',
          title: 'Le délai d\'attente est écoulé'
        });

        throw new Error(error);

      })
    ).subscribe(
        data => {
          Toast.fire({
            type: 'success',
            title: 'Analyse ajouté avec succès'
          });
          this.loading = false;
          this.action = true;
          this.dialogRef.close({action:this.action});
          console.log(data);

        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.Analyses.filter((state:any) => state.analyse.toLowerCase().indexOf(filterValue) === 0);
  }
}
