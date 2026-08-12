import { ORGAN_SYSTEMS as VERIFIED_ORGAN_SYSTEMS } from './verifiedOrganData';
import { AnatomicalPart, EssayData, OrganSystem, QuizQuestion } from '../types';

/**
 * Second-pass accuracy corrections after a detailed review of the educational
 * copy. This layer focuses on subtler overstatements and mechanism errors that
 * are easy to miss in a first-pass fact check.
 */
export const ORGAN_SYSTEMS: Record<string, OrganSystem> = JSON.parse(
  JSON.stringify(VERIFIED_ORGAN_SYSTEMS),
) as Record<string, OrganSystem>;

type PartPatch = Omit<Partial<AnatomicalPart>, 'essay'> & {
  essay?: Partial<EssayData>;
};

function patchPart(systemId: string, partId: string, patch: PartPatch) {
  const part = ORGAN_SYSTEMS[systemId]?.parts.find((candidate) => candidate.id === partId);
  if (!part) throw new Error(`Unknown anatomical part: ${systemId}/${partId}`);
  const { essay, ...rest } = patch;
  Object.assign(part, rest);
  if (essay) Object.assign(part.essay, essay);
}

function patchQuiz(systemId: string, quizId: string, patch: Partial<QuizQuestion>) {
  const question = ORGAN_SYSTEMS[systemId]?.defaultQuiz.find((candidate) => candidate.id === quizId);
  if (!question) throw new Error(`Unknown quiz question: ${systemId}/${quizId}`);
  Object.assign(question, patch);
}

// EYE -----------------------------------------------------------------------
patchPart('eye', 'retina', {
  essay: {
    overview:
      'The retina is the light-sensitive neural tissue lining the posterior eye and is developmentally part of the central nervous system. It converts photons into neural signals and performs substantial preprocessing before information leaves through retinal ganglion-cell axons. Human retinas contain tens of millions of rod photoreceptors and several million cone photoreceptors; exact counts vary among individuals and measurement studies.',
  },
});

patchQuiz('eye', 'q-eye-2', {
  funFact:
    'Rods greatly outnumber cones in the human retina, while cones are concentrated most densely in the central retina for high-acuity daylight vision.',
});

patchPart('eye', 'fovea', {
  essay: {
    anatomyAndHistology:
      'The fovea is a specialized central retinal depression in which inner retinal layers are displaced away from the optical path. Cone density is highest in the central foveola, whose very center is rod-free; rods appear again outside the central rod-free zone. The foveal avascular zone minimizes retinal vasculature over this high-acuity region.',
    physiologyAndMechanisms:
      'Central foveal vision has unusually low photoreceptor convergence and therefore exceptionally high spatial resolution. Near the foveal center, individual cones can feed dedicated midget bipolar and midget ganglion pathways, but this near-1:1 organization should not be generalized to every cone across the entire fovea or retina.',
  },
});

// BRAIN ---------------------------------------------------------------------
patchPart('brain', 'cerebellum', {
  essay: {
    anatomyAndHistology:
      'The cerebellum has two hemispheres joined by the vermis and is organized into anterior, posterior, and flocculonodular lobes. Its cortex has molecular, Purkinje-cell, and granule-cell layers. Purkinje cells provide the sole output of cerebellar cortex: most project to the deep cerebellar nuclei, while some—especially from vestibulocerebellar regions—project directly to vestibular nuclei.',
  },
});

// HEART ---------------------------------------------------------------------
patchPart('heart', 'right-ventricle', {
  funFact:
    'The right ventricle normally operates at much lower pressure than the left because pulmonary circulation has far lower vascular resistance than systemic circulation.',
});

// LUNGS ---------------------------------------------------------------------
patchPart('lungs', 'trachea', {
  description:
    'A flexible airway roughly 10–12 cm long in adults, reinforced by C-shaped cartilage rings and extending from the larynx to the main bronchi.',
  functionSummary:
    'Conducts air between the larynx and bronchi while cartilage helps keep the airway open and the mucociliary lining helps clear inhaled particles.',
});

// SKELETON ------------------------------------------------------------------
patchPart('skeleton', 'spine', {
  description:
    'The vertebral column develops from about 33 vertebral segments: 24 separate presacral vertebrae plus sacral and coccygeal segments that are usually fused in adults.',
  essay: {
    overview:
      'The vertebral column is the central flexible axis of the skeleton. It is described developmentally as about 33 vertebral segments—7 cervical, 12 thoracic, 5 lumbar, 5 sacral, and usually 4 coccygeal. In adults the sacral and coccygeal segments are normally fused, so they are not 33 separate movable bones. The column supports the trunk, permits movement, transfers loads, and protects the spinal cord and nerve roots.',
  },
});

patchPart('skeleton', 'femur', {
  description:
    'The longest and heaviest bone in the human body, engineered to tolerate very large loads between the hip and knee.',
});

// DIGESTIVE -----------------------------------------------------------------
patchPart('digestive', 'esophagus', {
  essay: {
    physiologyAndMechanisms:
      'Swallowing initiates primary peristalsis, a coordinated wave that propels the bolus toward the stomach. Circular and longitudinal muscle activity is coordinated by neural circuits. The lower esophageal sphincter normally maintains tonic pressure and relaxes through inhibitory enteric and vagal pathways, including nitric-oxide-mediated signaling, to allow a swallowed bolus to enter the stomach.',
  },
});

patchPart('digestive', 'stomach', {
  funFact:
    'Surface cells of the gastric epithelium turn over rapidly—often within a few days—while deeper gland cells have different lifespans. This renewal works together with mucus, bicarbonate, blood flow, and tight epithelial barriers to protect the stomach.',
  essay: {
    anatomyAndHistology:
      'The stomach is divided into cardia, fundus, body, and pyloric regions. Its muscular wall has longitudinal, circular, and oblique smooth-muscle layers that mix gastric contents. Gastric glands contain parietal cells that secrete hydrochloric acid and intrinsic factor, chief cells that secrete pepsinogen, and several mucus-secreting cell populations. Surface mucous cells are especially important for the mucus-bicarbonate barrier that protects the epithelium.',
  },
});

patchPart('digestive', 'liver', {
  essay: {
    clinicalSignificance:
      'Cirrhosis is advanced hepatic fibrosis with distortion of normal liver architecture and can lead to portal hypertension, ascites, varices, and hepatic encephalopathy. Advanced scarring is serious, but fibrosis—and in some circumstances even features of cirrhosis—can partially regress when the underlying cause is successfully treated. Jaundice is yellow discoloration of skin and sclera caused by elevated bilirubin, which can result from hemolysis, hepatocellular dysfunction, or impaired bile flow.',
  },
});

patchPart('digestive', 'small-intestine', {
  essay: {
    physiologyAndMechanisms:
      'Acidic chyme entering the duodenum promotes release of hormones including secretin and cholecystokinin (CCK). Secretin stimulates bicarbonate-rich pancreatic secretion, while CCK promotes gallbladder contraction and pancreatic enzyme secretion. Some pancreatic proteases are released as inactive zymogens such as trypsinogen, whereas enzymes including pancreatic amylase and lipase are secreted in active forms. Nutrient absorption uses multiple transport systems: for example glucose and galactose use SGLT1, fructose uses GLUT5, many amino acids use specific cotransporters, and many dietary lipids are packaged into chylomicrons that enter intestinal lacteals and the lymphatic system.',
  },
});

// EAR -----------------------------------------------------------------------
patchPart('ear', 'ear-canal', {
  essay: {
    physiologyAndMechanisms:
      'The external auditory canal acts as an acoustic resonator, increasing sound pressure over a broad frequency range important for human hearing and speech. Its exact resonant characteristics vary with individual ear geometry. Cerumen, hairs in the outer canal, and outward epithelial migration help trap debris and support the canal’s self-cleaning and protective functions.',
  },
});
