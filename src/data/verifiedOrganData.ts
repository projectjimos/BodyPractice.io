import { ORGAN_SYSTEMS as RAW_ORGAN_SYSTEMS } from './organData';
import { AnatomicalPart, EssayData, OrganSystem, QuizQuestion } from '../types';

/**
 * Medical-accuracy overrides for the educational content shown in the app.
 *
 * The original dataset is kept intact for easy comparison with the forked source.
 * These overrides remove false absolutes, outdated surface-area estimates,
 * unsupported viral-style trivia, and several anatomy/physiology errors.
 *
 * Primary references used for this audit include NIH/NEI, NHLBI, NIDDK, NIDCD,
 * NIMH and NCBI Bookshelf reviews.
 */
export const ORGAN_SYSTEMS: Record<string, OrganSystem> = JSON.parse(
  JSON.stringify(RAW_ORGAN_SYSTEMS),
) as Record<string, OrganSystem>;

type PartPatch = Omit<Partial<AnatomicalPart>, 'essay'> & {
  essay?: Partial<EssayData>;
};

type SystemPatch = Omit<Partial<OrganSystem>, 'labControls'> & {
  labControls?: Partial<OrganSystem['labControls']>;
};

function patchSystem(systemId: string, patch: SystemPatch) {
  const system = ORGAN_SYSTEMS[systemId];
  if (!system) throw new Error(`Unknown organ system: ${systemId}`);

  const { labControls, ...rest } = patch;
  Object.assign(system, rest);
  if (labControls) Object.assign(system.labControls, labControls);
}

function patchPart(systemId: string, partId: string, patch: PartPatch) {
  const system = ORGAN_SYSTEMS[systemId];
  const part = system?.parts.find((candidate) => candidate.id === partId);
  if (!part) throw new Error(`Unknown anatomical part: ${systemId}/${partId}`);

  const { essay, ...rest } = patch;
  Object.assign(part, rest);
  if (essay) Object.assign(part.essay, essay);
}

function patchQuiz(systemId: string, quizId: string, patch: Partial<QuizQuestion>) {
  const system = ORGAN_SYSTEMS[systemId];
  const question = system?.defaultQuiz.find((candidate) => candidate.id === quizId);
  if (!question) throw new Error(`Unknown quiz question: ${systemId}/${quizId}`);
  Object.assign(question, patch);
}

// ---------------------------------------------------------------------------
// EYE
// ---------------------------------------------------------------------------
patchPart('eye', 'cornea', {
  funFact:
    'The cornea has no blood vessels. With the eye open, much of its oxygen reaches the surface from air dissolved in the tear film; tears and aqueous humor also supply nutrients.',
  essay: {
    overview:
      "The cornea is the transparent, dome-shaped anterior window of the eye and its strongest fixed refractive surface. It supplies roughly two-thirds of the eye's focusing power and also provides an important protective barrier against trauma, particles, and microbes.",
    physiologyAndMechanisms:
      'To preserve transparency, the cornea is avascular. Oxygen reaches the anterior cornea mainly through the tear film when the eye is open, while nutrients are supplied by tears, aqueous humor, and vessels near the limbus. Corneal endothelial ion pumps move fluid from the stroma toward the aqueous humor, helping keep the stroma relatively dehydrated and transparent.',
  },
});

patchPart('eye', 'iris', {
  funFact:
    'The fine texture of each iris is highly individualized—even your left and right irises differ—which is why iris patterns can be used for biometric recognition.',
  essay: {
    anatomyAndHistology:
      'The iris has an anterior vascular stroma and a posterior pigmented epithelial layer. The stroma contains melanocytes, fibroblasts, and blood vessels. Eye color reflects the amount and distribution of melanin together with light scattering within the stroma: more melanin generally produces darker brown eyes, while lower stromal melanin allows more scattered light to contribute to blue, gray, or green appearances. The sphincter pupillae and dilator pupillae muscles change pupil diameter.',
  },
});

patchPart('eye', 'pupil', {
  funFact:
    'Pupil size changes not only with light but also with autonomic arousal and cognitive effort.',
  essay: {
    overview:
      'The pupil is the central opening in the iris through which light passes toward the lens and retina. It appears dark because most light entering the eye is absorbed by pigmented tissues inside the eye. Pupil diameter varies substantially with illumination, age, drugs, and autonomic state.',
  },
});

patchPart('eye', 'retina', {
  functionSummary:
    'Rods are highly sensitive in dim light and do not mediate color vision. Three cone classes—S, M, and L—support daylight color vision and high visual acuity by responding to overlapping ranges of wavelengths.',
  clinicalNote:
    'Retinal detachment is a medical emergency in which the light-sensitive retina is pulled away from its normal position at the back of the eye.',
  funFact:
    'The cornea and lens form an inverted image on the retina; useful visual perception emerges from processing in the retina and multiple brain regions.',
});

patchPart('eye', 'fovea', {
  funFact:
    'The fovea is tiny, but signals from central vision receive a disproportionately large amount of visual-cortex processing—a phenomenon called cortical magnification.',
});

patchPart('eye', 'optic-nerve', {
  functionSummary:
    'Carries retinal ganglion-cell signals to several brain targets, including the thalamus; most information used for conscious vision then reaches the occipital visual cortex.',
  clinicalNote:
    'Glaucoma damages the optic nerve. High intraocular pressure is an important risk factor, but glaucoma can also occur in people whose measured eye pressure is in the normal range.',
});

patchPart('eye', 'sclera', {
  funFact:
    'Humans have unusually exposed, lightly pigmented sclera compared with many primates, which makes gaze direction easy to see; some other primates can also have pale sclera.',
  essay: {
    physiologyAndMechanisms:
      'The dense collagen of the sclera gives the globe tensile strength, helps preserve eye shape, and provides attachment for the extraocular muscles. The sclera resists deformation from intraocular pressure, but it does not itself generate or regulate that pressure; intraocular pressure is strongly influenced by aqueous-humor production and drainage.',
  },
});

patchPart('eye', 'vitreous-humor', {
  functionSummary:
    'Transmits light, helps maintain globe shape, cushions internal structures, and provides mechanical support to the retina.',
  funFact:
    'The vitreous is not an unchanged lifetime gel: its collagen-hyaluronic-acid structure gradually remodels and liquefies with age, often leading to posterior vitreous detachment later in life.',
  essay: {
    overview:
      'The vitreous body is a transparent, colorless hydrogel filling the large cavity behind the lens. It transmits light, contributes to globe shape, cushions internal structures, and mechanically supports the retina, while normal retinal attachment also depends on the retina–retinal pigment epithelium interface and other physiologic forces.',
  },
});

// ---------------------------------------------------------------------------
// BRAIN
// ---------------------------------------------------------------------------
patchSystem('brain', {
  description:
    'The human brain contains about 86 billion neurons and extensive networks of glial cells. It processes sensory information, supports thought and memory, controls movement, and regulates vital body functions.',
  labControls: {
    description:
      'Select an everyday activity to see an illustrative map of brain regions commonly involved. Real brain activity is distributed, overlapping, and more complex than this teaching model.',
  },
});

patchPart('brain', 'frontal-lobe', {
  funFact:
    'The prefrontal cortex is among the last brain regions to mature; structural and functional development continues through adolescence and into the mid-to-late 20s rather than ending on one exact birthday.',
  essay: {
    overview:
      "The frontal lobe is the anterior portion of each cerebral hemisphere and contains networks important for executive function, voluntary motor control, working memory, decision making, emotional regulation, social behavior, and—in the dominant hemisphere—important components of language production. It is highly developed in humans but is not scientifically described as an 'evolutionary pinnacle.'",
    physiologyAndMechanisms:
      'Voluntary movement is generated by a distributed motor network that includes primary motor, premotor, supplementary motor, basal-ganglia, cerebellar, brainstem, and spinal circuits. Neurons in primary motor cortex contribute corticospinal axons that descend through the internal capsule and brainstem toward spinal motor circuits. Executive functions in prefrontal cortex depend on interacting cortical and subcortical networks rather than a single neurotransmitter pathway.',
    clinicalSignificance:
      "Frontal-lobe injury can impair executive function, motivation, inhibition, personality, and movement. Damage involving Broca-associated language networks commonly causes nonfluent speech with impaired language production; comprehension is often better preserved than speech output but is not necessarily completely normal.",
  },
});

patchPart('brain', 'parietal-lobe', {
  funFact:
    'The primary somatosensory cortex contains a body map: areas such as the fingertips and lips occupy disproportionately large cortical territory because of their dense sensory innervation.',
});

patchPart('brain', 'occipital-lobe', {
  funFact:
    'Primary visual cortex is in the occipital lobe, but visual perception depends on a distributed network that also includes temporal, parietal, thalamic, and other brain regions.',
});

patchPart('brain', 'temporal-lobe', {
  funFact:
    'Face recognition engages a rapid distributed visual network that includes fusiform and other temporal-lobe regions; it is not produced by one single “face center.”',
});

patchPart('brain', 'cerebellum', {
  funFact:
    'Although the cerebellum is only about one-tenth of brain mass, it contains roughly 80% of the brain’s neurons because its granule cells are extremely numerous and densely packed.',
  essay: {
    physiologyAndMechanisms:
      'The cerebellum compares motor plans with sensory feedback and contributes to prediction, timing, coordination, adaptation, and motor learning. Most sensory and cortical inputs arrive as mossy fibers; climbing fibers arise from the inferior olive and provide powerful teaching/error-related signals to Purkinje cells. Cerebellar output then influences motor and nonmotor networks through the deep cerebellar and vestibular nuclei.',
  },
});

patchPart('brain', 'brainstem', {
  essay: {
    physiologyAndMechanisms:
      'Brainstem networks in the medulla and pons generate and modulate breathing and cardiovascular reflexes. Central chemoreceptors respond mainly to changes in brain/CSF hydrogen-ion concentration caused by changes in arterial carbon dioxide, while peripheral chemoreceptors provide additional information about oxygen, carbon dioxide, and arterial pH. The ascending reticular activating system contributes to arousal and wakefulness.',
    clinicalSignificance:
      'Severe brainstem injury can cause respiratory, cardiovascular, motor, and consciousness disturbances. Locked-in syndrome classically produces quadriplegia and loss of most voluntary movement with preserved consciousness and often preserved vertical eye movement or blinking. Testing brainstem reflexes is an important part of neurologic determination of death, but formal brain-death criteria require a complete protocol and vary somewhat by jurisdiction.',
  },
});

patchPart('brain', 'hippocampus', {
  funFact:
    'Studies of London taxi drivers found hippocampal structural differences associated with extensive navigation experience; the finding is evidence of brain plasticity, not proof that one specific training effect explains every individual difference.',
});

// ---------------------------------------------------------------------------
// HEART
// ---------------------------------------------------------------------------
patchPart('heart', 'right-atrium', {
  essay: {
    clinicalSignificance:
      'Atrial fibrillation is a common arrhythmia in which atrial electrical activity is disorganized and coordinated atrial contraction is lost. Blood stasis—especially in the left atrial appendage—can promote thrombus formation and raise the risk of ischemic stroke. Elevated right-atrial pressure can produce jugular venous distension in conditions such as right-sided heart failure or cardiac tamponade.',
  },
});

patchPart('heart', 'left-atrium', {
  funFact:
    'Pulmonary veins are unusual among adult veins because they return oxygen-rich blood from the lungs to the left atrium. During fetal life, the umbilical vein also carries oxygen-rich blood.',
  essay: {
    clinicalSignificance:
      'The left atrial appendage is a major site of thrombus formation in atrial fibrillation and is an important target in stroke-prevention strategies. The left atrium lies close to the esophagus, which is why transesophageal echocardiography can provide detailed views of the chamber and mitral valve.',
  },
});

patchPart('heart', 'left-ventricle', {
  description:
    'The thick-walled lower left chamber of the heart that pumps oxygen-rich blood into the aorta and systemic circulation.',
  funFact:
    'The left ventricle has a much thicker muscular wall than the right ventricle because it must generate the higher pressures required for systemic circulation.',
  essay: {
    physiologyAndMechanisms:
      'The heartbeat begins in the sinoatrial node. After atrial activation and a brief delay through the atrioventricular node, the impulse travels through the His–Purkinje system and bundle branches to activate the ventricles. Left-ventricular contraction closes the mitral valve; when ventricular pressure exceeds aortic pressure, the aortic valve opens and blood is ejected. Cardiac output equals stroke volume multiplied by heart rate.',
  },
});

patchPart('heart', 'heart-valves', {
  clinicalNote:
    'The familiar “lub-dub” heart sounds are produced mainly by vibrations associated with closure of the atrioventricular valves (S1) and semilunar valves (S2), together with sudden changes in blood and tissue motion.',
  funFact:
    'At normal heart rates, each valve cycles billions of times over a human lifetime.',
});

patchQuiz('heart', 'q-heart-1', {
  funFact:
    'At rest, a typical adult heart pumps on the order of several liters of blood each minute, and cardiac output rises substantially during exercise.',
});

// ---------------------------------------------------------------------------
// LUNGS
// ---------------------------------------------------------------------------
patchSystem('lungs', {
  description:
    'The respiratory system brings oxygen into the body and removes carbon dioxide, a normal metabolic byproduct whose concentration also helps regulate blood pH.',
  keyFunctions: [
    'Moves air through the conducting airways to the lungs',
    'Performs microscopic gas exchange across millions of alveoli',
    'Exhales carbon dioxide and water vapor',
    'Helps regulate acid-base balance through carbon dioxide excretion',
  ],
});

patchPart('lungs', 'trachea', {
  funFact:
    'The trachea is lined with microscopic cilia that move mucus and trapped particles upward toward the throat as part of the mucociliary escalator.',
});

patchPart('lungs', 'bronchi', {
  functionSummary:
    'Conducts and distributes air through progressively smaller airway branches to the respiratory regions of the lungs.',
  funFact:
    'The airway tree branches through many generations, from the main bronchi to tiny bronchioles, creating a very large conducting network inside the lungs.',
});

patchPart('lungs', 'alveoli', {
  funFact:
    'Human lungs contain an enormous number of alveoli and provide tens of square metres of gas-exchange surface area; published estimates vary with age and measurement method.',
  essay: {
    overview:
      'Alveoli are microscopic, thin-walled air spaces that form the principal gas-exchange region of the lungs. Humans have a very large number of alveoli, creating a gas-exchange surface measured in tens of square metres. Exact counts and surface-area estimates vary among studies and with age, lung size, and measurement technique.',
  },
});

patchPart('lungs', 'diaphragm', {
  functionSummary:
    'Contracts and moves downward during inhalation, enlarging the chest cavity and lowering pressure so air flows in. During quiet exhalation it relaxes while elastic recoil of the lungs and chest wall helps air flow out.',
  funFact:
    'Lung tissue does not actively inflate itself. The diaphragm and other breathing muscles change thoracic volume and pressure; the airways themselves do contain smooth muscle that can narrow or widen them.',
});

// ---------------------------------------------------------------------------
// SKELETON & MUSCLE
// ---------------------------------------------------------------------------
patchSystem('skeleton', {
  description:
    'A typical adult skeleton has 206 bones that provide support, protect organs, store minerals, and work with skeletal muscles to produce movement.',
  keyFunctions: [
    'Protects vital organs such as the brain, heart, and lungs',
    'Provides levers and attachment points for movement and posture',
    'Supports blood-cell production in red bone marrow',
    'Stores about 99% of body calcium and about 85% of body phosphorus',
  ],
});

patchPart('skeleton', 'cranium', {
  description:
    'The adult skull usually contains 22 cranial and facial bones. Most are joined by sutures; the mandible forms a freely movable synovial joint with the temporal bone.',
  funFact:
    'The mandible is the only freely movable bone of the skull proper; the tiny auditory ossicles in the middle ear also move during hearing.',
});

patchPart('skeleton', 'spine', {
  essay: {
    physiologyAndMechanisms:
      'The vertebral column acts as a dynamic load-bearing and shock-absorbing structure. Intervertebral discs distribute compressive forces, while the normal cervical, thoracic, lumbar, and sacral curves help balance the body and spread mechanical loads. The benefit is real, but a universal “tenfold” increase in flexibility is not an established human-anatomy constant.',
  },
});

patchPart('skeleton', 'femur', {
  functionSummary:
    'Bears and transmits large loads between the hip and knee during standing, walking, running, and jumping.',
  clinicalNote:
    'Femur fracture strength cannot be reduced to one universal force value: it varies with age, bone density, loading direction, geometry, and the type of impact.',
  essay: {
    overview:
      'The femur is the single bone of the thigh and the longest, heaviest, and one of the strongest bones in the human skeleton. It transfers large loads from the hip toward the knee during standing and locomotion.',
  },
});

patchPart('skeleton', 'biceps-triceps', {
  functionSummary:
    'Skeletal muscles generate tensile force rather than actively pushing bones. At the elbow, biceps brachii contributes to flexion and supination, while triceps brachii is the main elbow extensor.',
  clinicalNote:
    'Tendinitis describes inflammation of a tendon; many overuse tendon problems are more accurately termed tendinopathy because degeneration can occur with little inflammation.',
});

patchQuiz('skeleton', 'q-skel-1', {
  funFact:
    'Bone is a composite tissue: mineral hydroxyapatite provides stiffness and compressive strength, while collagen contributes toughness and resistance to fracture.',
});

// ---------------------------------------------------------------------------
// DIGESTIVE SYSTEM
// ---------------------------------------------------------------------------
patchSystem('digestive', {
  description:
    'The digestive system is a long series of hollow organs from mouth to anus, supported by organs such as the liver, pancreas, and gallbladder. It digests food, absorbs nutrients and water, and eliminates indigestible waste.',
  keyFunctions: [
    'Mechanical breakdown through chewing, mixing, and muscular contractions',
    'Chemical digestion by acid, bile, and digestive enzymes',
    'Absorption of most nutrients and much of the water in the small intestine; many dietary fats enter lymph before reaching blood',
    'Processing, storage, synthesis, and detoxification functions performed by the liver',
  ],
});

patchPart('digestive', 'esophagus', {
  essay: {
    overview:
      'The esophagus is a muscular conducting tube about 25 cm long in adults that connects the pharynx to the stomach. Its main role is to transport swallowed food and liquid through coordinated peristalsis, while upper and lower sphincter mechanisms help limit unwanted air entry and reflux.',
  },
});

patchPart('digestive', 'stomach', {
  functionSummary:
    'Secretes hydrochloric acid and pepsin-related enzymes, mixes food mechanically, denatures and begins digestion of proteins, and turns the meal into semi-liquid chyme.',
  clinicalNote:
    'Peptic ulcers are sores in the stomach or duodenal lining. The two most common causes are Helicobacter pylori infection and nonsteroidal anti-inflammatory drugs (NSAIDs), not simply “acid burning through” an otherwise normal stomach.',
});

patchPart('digestive', 'liver', {
  clinicalNote:
    'The liver has an extraordinary capacity to restore lost mass after partial surgical removal. It is not the only human tissue capable of regeneration, and the amount that can be safely removed depends on liver health and clinical circumstances.',
  funFact:
    'The liver performs a very large range of metabolic, synthetic, storage, immune, and detoxification functions; assigning one exact “number of functions” is not scientifically meaningful.',
  essay: {
    overview:
      'The liver is the largest internal gland and a major metabolic organ, weighing roughly 1.5 kg in many adults. It receives blood from the hepatic artery and portal vein and performs diverse functions including carbohydrate and lipid metabolism, plasma-protein synthesis, drug and toxin processing, immune functions, nutrient storage, and bile production.',
  },
});

patchPart('digestive', 'small-intestine', {
  description:
    'A long, folded intestinal tube divided into the duodenum, jejunum, and ileum. Its lining contains villi and microvilli that greatly increase absorptive surface area.',
  functionSummary:
    'Completes much of chemical digestion and absorbs most dietary nutrients, along with large amounts of water and electrolytes. Many water-soluble nutrients enter blood, while much absorbed fat first enters lymphatic lacteals.',
  funFact:
    'Modern anatomical estimates place the adult intestinal absorptive surface on the order of about 30 square metres—not the size of a tennis court.',
  essay: {
    overview:
      'The small intestine is the longest segment of the gastrointestinal tract and is divided into duodenum, jejunum, and ileum. Its length varies substantially among people and with how it is measured. It is the principal site for completion of digestion and absorption of most dietary nutrients.',
    anatomyAndHistology:
      'The small-intestinal mucosa greatly expands absorptive area through circular folds, villi, and microscopic microvilli on enterocytes. Modern morphometric estimates put total adult intestinal mucosal surface area at roughly 30 square metres, far below older textbook estimates of 200–300 square metres. Each villus contains blood capillaries and a central lymphatic lacteal.',
  },
});

// ---------------------------------------------------------------------------
// EAR, HEARING & BALANCE
// ---------------------------------------------------------------------------
patchPart('ear', 'pinna', {
  funFact:
    'The folds of the pinna modify incoming sound in direction-dependent ways, providing spectral cues that help the brain judge whether a sound came from above, below, in front, or behind.',
});

patchPart('ear', 'ear-canal', {
  functionSummary:
    'Directs sound toward the eardrum. Hairs, migrating skin, and cerumen help trap debris and protect the canal; these hairs are not the sensory “hair cells” of the inner ear.',
  essay: {
    physiologyAndMechanisms:
      'The ear canal acts as an acoustic resonator that boosts sound pressure over a broad frequency range important for hearing speech. Cerumen and outward migration of canal skin help protect and self-clean the canal. The exact resonance depends on individual ear-canal geometry.',
  },
});

patchPart('ear', 'ossicles', {
  functionSummary:
    'Transfers eardrum vibration to the oval window and increases sound pressure through the eardrum-to-stapes area ratio and ossicular lever action, improving transmission from air into cochlear fluid.',
  essay: {
    physiologyAndMechanisms:
      'The middle ear improves acoustic impedance matching between air and cochlear fluid. Much of the pressure gain comes from concentrating force collected over the larger effective area of the tympanic membrane onto the much smaller stapes footplate, with additional lever action from the malleus–incus system. In the standard acoustic reflex, the stapedius muscle is the principal middle-ear muscle activated by loud sounds; this reflex is not a complete protector against hazardous noise.',
  },
});

patchPart('ear', 'cochlea', {
  name: 'Cochlea',
  description:
    'A snail-shaped, fluid-filled inner-ear structure containing the Organ of Corti, where sensory hair cells convert mechanical vibration into neural signals.',
  clinicalNote:
    'Damage to cochlear hair cells and other inner-ear structures can cause sensorineural hearing loss. Cochlear implants can provide useful sound perception to selected people by electrically stimulating the auditory nerve, but they do not restore normal biological hearing.',
  funFact:
    'The cochlea is tonotopically organized: higher-frequency sounds produce maximal basilar-membrane motion nearer the base, while lower-frequency sounds peak progressively closer to the apex.',
  essay: {
    anatomyAndHistology:
      'The cochlea contains the scala vestibuli and scala tympani, filled with perilymph, and the scala media, filled with potassium-rich endolymph. The Organ of Corti sits on the basilar membrane and contains inner hair cells, which provide most sensory input to the auditory nerve, and outer hair cells, which actively amplify and sharpen cochlear mechanics. Outer-hair-cell stereocilia interact with the tectorial membrane; inner-hair-cell stereocilia are deflected by fluid motion and are not embedded in it.',
    physiologyAndMechanisms:
      'Movement of the stapes at the oval window launches pressure waves that move the basilar membrane. Because the membrane changes in stiffness and width along the cochlea, different frequencies peak at different locations: high frequencies near the base and low frequencies nearer the apex. Hair-bundle deflection opens mechanically gated ion channels, changing hair-cell membrane potential and neurotransmitter release onto auditory-nerve fibers.',
  },
});

patchPart('ear', 'semicircular-canals', {
  description:
    'Three fluid-filled canals oriented in different planes that primarily detect angular (rotational) head acceleration.',
  functionSummary:
    'Detects head rotation and drives vestibular reflexes that help stabilize gaze and balance. Static head tilt, gravity, and linear acceleration are sensed mainly by the utricle and saccule, not the semicircular canals.',
});

patchPart('ear', 'auditory-nerve', {
  functionSummary:
    'The cochlear division carries auditory signals to brainstem auditory nuclei; the vestibular division carries balance information to vestibular nuclei and connected cerebellar, ocular, and postural networks.',
  funFact:
    'Auditory-nerve conduction is fast enough for millisecond-scale hearing, but the often-repeated claim of about 120 m/s (260 mph) is far too high for the human auditory nerve; direct human measurements are closer to tens of metres per second.',
});

patchQuiz('ear', 'q-ear-1', {
  options: [
    'To generate cerumen (earwax)',
    'To transfer vibration and increase pressure at the oval window so sound couples efficiently into cochlear fluid',
    'To detect rotational head movements for balance',
    'To equalize air pressure between the middle ear and the throat',
  ],
  explanation:
    'The ossicles form a mechanical linkage between the eardrum and oval window. Their lever action and the large eardrum-to-small-stapes area ratio increase pressure and improve sound transmission from air into cochlear fluid.',
});

patchQuiz('ear', 'q-ear-4', {
  explanation:
    'The semicircular canals primarily detect angular head rotation. The nearby utricle and saccule are the vestibular organs that detect gravity, head tilt, and linear acceleration.',
});
