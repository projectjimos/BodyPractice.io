import { OrganSystem } from '../types';

export const ORGAN_SYSTEMS: Record<string, OrganSystem> = {
  eye: {
    id: 'eye',
    title: 'The Human Eye',
    systemName: 'Visual System & Sense Organ',
    subtitle: 'The Biological Camera of the Mind',
    accentColor: '#10B981', // Emerald green
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    description: 'The eye captures light reflected from objects and focuses it onto photoreceptor cells, converting light rays into neural signals sent to the brain.',
    keyFunctions: [
      'Refracts light through Cornea and Lens',
      'Regulates light entry via Pupil & Iris constriction',
      'Converts photons to electrical impulses in Retina',
      'Transmits signals to Occipital Lobe via Optic Nerve'
    ],
    labControls: {
      title: 'Optics & Light Reflex Lab',
      description: 'Adjust ambient light brightness and focal distance to see how the Pupil constricts/dilates and how the Lens reshapes to focus light directly on the Fovea.'
    },
    parts: [
      {
        id: 'cornea',
        name: 'Cornea',
        pronunciation: 'KOR-nee-uh',
        category: 'Refractive Surface',
        description: 'The clear, dome-shaped outer window covering the front of the eye. It provides about two-thirds of the eye’s total focusing power.',
        functionSummary: 'Bends (refracts) light rays into the eye and protects delicate inner structures.',
        analogy: 'The clear protective glass front of a wristwatch or smartphone camera lens.',
        clinicalNote: 'Laser eye surgery (LASIK) reshapes the cornea to fix nearsightedness and farsightedness.',
        funFact: 'The cornea is the only tissue in the human body that has no blood vessels; it receives oxygen directly from the air!',
        svgCoords: { x: 120, y: 200 },
        color: '#38BDF8',
        essay: {
          overview: 'The cornea is the transparent, dome-shaped anterior window of the human eyeball that acts as the optical gateway for visual perception. Functioning as the eye\'s primary fixed refractive element, it accounts for approximately 65% to 75% of the total optical power of the eye (roughly +43 diopters). Beyond its optical role, the cornea forms an impenetrable physical barrier that protects internal intraocular structures against mechanical trauma, dust, airborne pathogens, and environmental toxins.',
          anatomyAndHistology: 'Histologically, the human cornea is approximately 0.5 mm thick centrally and consists of five distinct, highly specialized avascular layers: (1) The anterior corneal epithelium, a stratified squamous non-keratinized layer with rapid regenerative capacity; (2) Bowman\'s membrane, an acellular collagenous boundary; (3) The corneal stroma, making up 90% of corneal thickness and composed of regularly spaced Type I and Type V collagen lamellae whose precise lattice arrangement creates optical transparency; (4) Descemet\'s membrane, a thick basement membrane secreted by endothelium; and (5) The posterior corneal endothelium, a single layer of metabolic pump cells that maintain corneal dehydration.',
          physiologyAndMechanisms: 'To maintain perfect optical clarity, the cornea remains strictly avascular, deriving oxygen directly from ambient air dissolved in the pre-corneal tear film and nutrients from the aqueous humor circulating in the anterior chamber. The corneal endothelial cells continuously utilize Na+/K+-ATPase energy pumps to actively pump excess fluid out of the stroma back into the anterior chamber, preventing corneal edema (swelling) which would disrupt the collagen lattice and turn the clear cornea opaque.',
          clinicalSignificance: 'Pathology of the cornea represents a major cause of global blindness. Keratoconus is a progressive condition where the stroma thins and bulges into a cone shape, causing severe astigmatism. In refractive procedures such as LASIK and PRK, ultraviolet excimer lasers precisely ablate microscopic stromal layers to alter corneal curvature and permanently correct myopia, hyperopia, and astigmatism. Corneal transplants (keratoplasty) enjoy high surgical success rates due to the tissue\'s immune privilege derived from its avascular nature.'
        }
      },
      {
        id: 'iris',
        name: 'Iris',
        pronunciation: 'EYE-ris',
        category: 'Muscular Diaphragm',
        description: 'The colored ring of smooth muscle tissue surrounding the pupil. Contains pigments (melanin) that give eyes their color.',
        functionSummary: 'Controls the size of the pupil to regulate the amount of light entering the eye.',
        analogy: 'The adjustable aperture ring on a professional camera lens.',
        clinicalNote: 'Eye color is determined by the amount and distribution of melanin pigment in the iris.',
        funFact: 'Your iris pattern is even more unique than your fingerprint, with over 256 distinct biometric identifiers!',
        svgCoords: { x: 190, y: 130 },
        color: '#A855F7',
        essay: {
          overview: 'The iris is a thin, pigmented circular smooth muscle diaphragm located in the anterior segment of the eye, positioned directly between the cornea and the crystalline lens. Acting as the biological camera aperture, the iris dynamically regulates the diameter of its central opening—the pupil—to control the intensity of light falling onto the light-sensitive retina. In addition to regulating light flux, the iris prevents peripheral spherical aberration by blocking stray light rays from passing through the distorted edges of the lens.',
          anatomyAndHistology: 'The iris consists of two main anatomical layers derived from distinct embryonic germ layers: the anterior vascularized stroma and the posterior pigmented epithelial layer. The stroma contains melanocytes, fibroblasts, and blood vessels. Eye color is governed not by different pigment types, but by the density and concentration of melanin within stromal melanocytes—dense melanin absorbs light, yielding dark brown eyes, whereas sparse melanin scatters light via Rayleigh scattering, creating blue or green eyes. Embedded in the stroma are two opposing smooth muscle networks: the sphincter pupillae (a circular sphincter muscle) and the dilator pupillae (radially arranged muscle fibers).',
          physiologyAndMechanisms: 'Pupillary movements are governed by dual autonomic neurological reflex arcs. When bright light hits the retina, parasympathetic signals via the oculomotor nerve (CN III) stimulate the sphincter pupillae muscle to contract, inducing pupillary constriction (miosis). Conversely, in low ambient light or during fight-or-flight sympathetic nervous system arousal, sympathetic fibers from the superior cervical ganglion stimulate the dilator pupillae muscle to contract, widening the pupil (mydriasis).',
          clinicalSignificance: 'Anterior uveitis (iritis) is a painful inflammatory condition of the iris that causes photophobia, blurred vision, and red eyes. Aniridia is a rare congenital absence of the iris that leads to severe glare sensitivity and reduced visual acuity. Biometrically, the complex crypts, furrows, and pigmented rings of the human iris provide a highly reliable biometric identification parameter utilized in high-security authentication systems.'
        }
      },
      {
        id: 'pupil',
        name: 'Pupil',
        pronunciation: 'PYOO-pul',
        category: 'Aperture',
        description: 'The black opening in the center of the iris through which light enters the eye.',
        functionSummary: 'Shrinks (constricts) in bright light to protect the retina and enlarges (dilates) in dim light to gather more photons.',
        analogy: 'The opening hole in a camera shutter.',
        clinicalNote: 'Doctors shine a light into eyes (pupillary light reflex) to quickly check brainstem function.',
        funFact: 'Your pupils also dilate slightly when you see someone you love or encounter an exciting problem!',
        svgCoords: { x: 200, y: 200 },
        color: '#1E293B',
        essay: {
          overview: 'The pupil is the central aperture formed by the inner circular border of the iris through which light enters the posterior chambers of the eye. Appearing deep black because almost all light entering the eye is absorbed by the pigmented tissues inside the eye (specifically the retinal pigment epithelium and choroid), the pupil acts as a non-reflective gateway. Its dynamic diameter ranges from approximately 2 millimeters in bright sunlight to 8 millimeters in complete darkness, modulating light throughput by up to a factor of 16.',
          anatomyAndHistology: 'Anatomically, the pupil is not a physical structure but an open spatial void bounded by the pupillary margin of the iris. It is filled with clear aqueous humor flowing forward from the posterior chamber (where it is produced by the ciliary body) into the anterior chamber. The aperture size is continuously dictated by the physical mechanical tension balance exerted by the surrounding iris sphincter pupillae and dilator pupillae muscles.',
          physiologyAndMechanisms: 'The pupillary light reflex (PLR) is a fundamental diagnostic neurological mechanism. Light shining into one eye triggers action potentials along the optic nerve (CN II) to the pretectal nucleus in the midbrain. Interneurons bilaterally project to the Edinger-Westphal nuclei, sending parasympathetic nerve impulses down both left and right oculomotor nerves (CN III) to contract both pupils simultaneously (direct and consensual pupillary response). Beyond light level responses, the pupil also constricts during the "near triad" accommodation reflex when shifting focus to a close object, improving depth of field.',
          clinicalSignificance: 'Evaluating pupillary responses provides vital information regarding brainstem integrity and autonomic function. Anisocoria (unequal pupil sizes) can indicate neurological emergencies such as intracranial hemorrhage or Horner\'s syndrome. An Argyll Robertson pupil (which constricts during near accommodation but fails to constrict in response to light) is a classic sign of neurosyphilis. Pharmacologically, mydriatic eye drops (such as atropine or tropicamide) block muscarinic receptors to dilate pupils during eye exams.'
        }
      },
      {
        id: 'lens',
        name: 'Lens (Crystalline Lens)',
        pronunciation: 'LENZ',
        category: 'Focusing Mechanism',
        description: 'A transparent, flexible biconvex structure located directly behind the pupil.',
        functionSummary: 'Changes shape (accommodation) to fine-tune focus for near or far objects so images land sharply on the retina.',
        analogy: 'The auto-focus mechanism inside an adjustable digital camera lens.',
        clinicalNote: 'Clouding of the lens due to aging or UV exposure is known as a cataract, which can be replaced with an artificial lens.',
        funFact: 'The lens grows new layers throughout your entire life, becoming gradually firmer as you age.',
        svgCoords: { x: 250, y: 200 },
        color: '#F59E0B',
        essay: {
          overview: 'The crystalline lens is an adjustable biconvex optical structure suspended behind the iris and in front of the vitreous body. Responsible for fine-tuning the eye\'s focus, it contributes approximately +15 to +20 diopters of variable refractive power. By dynamically altering its physical curvature in response to object distance—a process termed accommodation—the lens ensures that light rays converge precisely onto the photoreceptor layer of the retina regardless of whether viewing a distant mountain peak or printed text held close to the face.',
          anatomyAndHistology: 'The lens is an entirely avascular structure enveloped by a elastic collagenous lens capsule. Directly underneath the anterior capsule sits a single layer of cuboidal epithelial cells that continuously divide at the equator, differentiating into elongated, ribbon-like lens fibers. As these fibers mature, they degrade their nuclei and internal organelles to achieve transparency and become densely packed with specialized soluble proteins called crystallins (alpha, beta, and gamma crystallins). The lens is held in suspense by delicate microfibrillar zonular fibers (zonules of Zinn) attached to the surrounding ciliary body.',
          physiologyAndMechanisms: 'Mechanism of accommodation is mediated by the ciliary muscle. When viewing distant objects (>6 meters), the ciliary muscle relaxes, expanding its ring diameter; this pulls the zonular fibers taut, flattening the elastic lens into a lower refractive state. When viewing near objects, parasympathetic stimulation causes the ciliary muscle to contract (constrict inwards), releasing tension on the zonular fibers. Relieved of tension, the elastic lens rounds up, increasing its front and back curvature and boosting refractive power to bring close images into sharp focus.',
          clinicalSignificance: 'With advancing age, progressive cross-linking of crystallin proteins and accumulation of metabolic oxidative damage cause loss of lens elasticity, resulting in presbyopia (inability to focus on near objects starting around age 40). Furthermore, oxidative degradation leads to opacification of the lens, termed a cataract. Modern cataract surgery involves phacoemulsification (ultrasonic disintegration of the cloudy natural lens) followed by intraocular lens (IOL) implantation.'
        }
      },
      {
        id: 'retina',
        name: 'Retina',
        pronunciation: 'RET-i-nuh',
        category: 'Photoreceptor Layer',
        description: 'The light-sensitive layer of neural tissue lining the back inner surface of the eyeball. Contains millions of Rods and Cones.',
        functionSummary: 'Rods detect motion & low light (black/white), while Cones detect fine detail & color (Red, Green, Blue). Converts photons to electrical signals.',
        analogy: 'The digital image sensor (CMOS/CCD chip) inside a camera that captures the picture.',
        clinicalNote: 'Retinal detachment is a medical emergency where the retina peels away from underlying blood vessels.',
        funFact: 'The retina processes visual information in reverse and upside down before sending it to the brain!',
        svgCoords: { x: 450, y: 150 },
        color: '#EF4444',
        essay: {
          overview: 'The retina is the neurosensory light-sensitive tissue coat lining the inner posterior surface of the eye. Functionally serving as an outgrowth of the central nervous system (CNS), the retina transduces incident light photons into graded biochemical electrical impulses, initiating signal processing long before visual information reaches the brain. It contains over 120 million rod photoreceptors for low-light vision and 6 million cone photoreceptors for color discrimination and visual acuity.',
          anatomyAndHistology: 'Histologically, the retina exhibits a highly organized 10-layer micro-architectural cascade: (1) Retinal Pigment Epithelium (RPE), (2) Photoreceptor layer (outer/inner segments of rods and cones), (3) External limiting membrane, (4) Outer nuclear layer (photoreceptor cell bodies), (5) Outer plexiform layer, (6) Inner nuclear layer (bipolar, horizontal, and amacrine interneurons), (7) Inner plexiform layer, (8) Ganglion cell layer (RGCs), (9) Nerve fiber layer (unmyelinated RGC axons), and (10) Internal limiting membrane.',
          physiologyAndMechanisms: 'Phototransduction occurs in photoreceptor outer segments containing opsin G-protein coupled receptors bound to 11-cis-retinal chromophores. Absorption of a photon causes 11-cis-retinal to photoisomerize into all-trans-retinal, activating the G-protein transducin. Transducin activates cGMP phosphodiesterase (PDE), hydrolyzing cGMP to GMP and closing cyclic nucleotide-gated sodium channels. Hyperpolarization of the membrane decreases glutamate neurotransmitter release at the synapse with bipolar cells, initiating visual signal cascades.',
          clinicalSignificance: 'Because the neurosensory retina relies heavily on oxygen and glucose delivered by the underlying choroid and retinal capillaries, vascular compromise causes devastating vision loss. Diabetic retinopathy causes microaneurysms and neovascularization that can bleed into the vitreous. Retinal detachment occurs when the neurosensory retina separates from the underlying RPE, requiring urgent laser photocoagulation or vitrectomy.'
        }
      },
      {
        id: 'fovea',
        name: 'Fovea Centralis',
        pronunciation: 'FOH-vee-uh sen-TRA-lis',
        category: 'High-Acuity Center',
        description: 'A small pit located in the center of the macula region of the retina. Packed densely with cone photoreceptors.',
        functionSummary: 'Responsible for sharp central vision required for reading, driving, and recognizing faces.',
        analogy: 'The ultra-high-resolution megapixel center of an HD camera sensor.',
        clinicalNote: 'Macular degeneration affects the fovea, impairing detailed central vision.',
        funFact: 'Although the fovea accounts for less than 1% of retinal area, over 50% of the visual cortex in the brain is dedicated to processing its input!',
        svgCoords: { x: 490, y: 200 },
        color: '#EC4899',
        essay: {
          overview: 'The fovea centralis is a specialized pit measuring approximately 1.5 mm in diameter situated at the center of the macula lutea in the posterior retina. It is responsible for maximum visual acuity, spatial resolution, and color perception. Whenever humans look directly at an object to read text, recognize a facial expression, or thread a needle, the extraocular muscles rotate the eye so that light from the target falls directly onto the fovea.',
          anatomyAndHistology: 'Histologically, the fovea exhibits extraordinary micro-architectural adaptations designed to eliminate optical distortion. Overlying inner retinal layers (ganglion cells, bipolar cells, and inner plexiform layers) are displaced laterally outward into a surrounding ridge (foveal avascular zone). This architectural "foveal pit" allows incident light rays to hit the photoreceptor outer segments directly without passing through scattering neural tissue layers. Furthermore, the fovea contains exclusively slender, elongated cone photoreceptors packed at ultra-high densities (up to 200,000 cones/mm²) with zero rod cells.',
          physiologyAndMechanisms: 'The neural wiring of the fovea is optimized for 1:1 spatial resolution. Unlike the peripheral retina where hundreds of rod photoreceptors converge onto a single ganglion cell (high sensitivity, low resolution), each foveal cone connects to a single midget bipolar cell, which in turn synapses onto a single midget ganglion cell. This dedicated "1-to-1 private line" prevents neural summation and preserves maximum spatial frequency details.',
          clinicalSignificance: 'Age-related macular degeneration (AMD) specifically damages the macula and fovea through accumulation of extracellular metabolic debris (drusen) in dry AMD or pathologic choroidal neovascularization in wet AMD. Because the fovea handles central high-acuity vision, foveal destruction robs patients of the ability to read or recognize faces while leaving gross peripheral field vision intact.'
        }
      },
      {
        id: 'optic-nerve',
        name: 'Optic Nerve',
        pronunciation: 'OP-tik NURV',
        category: 'Neural Highway',
        description: 'A thick bundle of over one million nerve fibers connecting the retina to the brain’s visual cortex.',
        functionSummary: 'Transmits electrical impulses generated by the retina directly to the occipital lobe of the brain.',
        analogy: 'A high-speed fiber-optic data cable transferring raw camera data to a computer processor.',
        clinicalNote: 'Glaucoma occurs when high pressure inside the eye damages fibers of the optic nerve, causing gradual vision loss.',
        funFact: 'The point where the optic nerve leaves the eye lacks photoreceptors, creating a natural "Blind Spot" in every human eye!',
        svgCoords: { x: 530, y: 250 },
        color: '#8B5CF6',
        essay: {
          overview: 'The optic nerve (Cranial Nerve II) is a massive paired neural pathway containing over 1.2 million myelinated axons that convey organized visual information from the retina to the diencephalon and visual cortex of the brain. Because the optic nerve develops as an outfolding of the embryonic forebrain, it is structurally considered a tract of the central nervous system rather than a true peripheral nerve, enclosed by all three cranial meningeal layers (dura, arachnoid, and pia mater).',
          anatomyAndHistology: 'The optic nerve originates at the optic disc (optic nerve head) where retinal ganglion cell (RGC) axons converge and exit the sclera through a perforated sieve-like collagen plate termed the lamina cribrosa. At the optic disc, axons lack myelin; however, upon passing posterior to the lamina cribrosa, oligodendrocytes myelinate the nerve fibers, causing nerve diameter to expand from 1.5 mm to 3.0 mm. The nerve proceeds through the orbit, passes through the optic canal, and converges at the optic chiasm where axons from the nasal hemiretinas decussate (cross) to the contralateral optic tract.',
          physiologyAndMechanisms: 'Action potentials generated by retinal ganglion cells travel along optic nerve axons via saltatory conduction mediated by nodes of Ranvier. Because no photoreceptors can reside over the physical site where the optic nerve exits the eyeball at the optic disc, this region creates an anatomical scotoma in the visual field known as the physiological "blind spot," which the cerebral cortex seamlessly interpolates.',
          clinicalSignificance: 'Glaucoma is a sight-threatening optic neuropathy characterized by progressive cupping and loss of retinal ganglion cell axons, often driven by elevated intraocular pressure (IOP). Papilledema refers to swelling of the optic disc secondary to elevated intracranial pressure (ICP) transmitted through the subarachnoid space surrounding the nerve. Multiple sclerosis frequently presents with optic neuritis—autoimmune demyelination of the optic nerve causing painful vision loss.'
        }
      },
      {
        id: 'sclera',
        name: 'Sclera',
        pronunciation: 'SKLEER-uh',
        category: 'Protective Shell',
        description: 'The tough, white fibrous outer coat of the eye that covers everything except the cornea.',
        functionSummary: 'Maintains the shape of the eyeball and serves as an attachment site for muscles that move the eye.',
        analogy: 'The rigid outer protective plastic casing of a camera body.',
        clinicalNote: 'Yellowing of the sclera (scleral icterus) is often a sign of jaundice or liver dysfunction.',
        funFact: 'Humans are among the only primates with a stark white sclera, which allows others to easily track where we are looking!',
        svgCoords: { x: 350, y: 60 },
        color: '#F8FAFC',
        essay: {
          overview: 'The sclera is the dense, opaque, fibrous protective outer tunic covering approximately five-sixths of the posterior eyeball, extending from the limbus anteriorly to the optic nerve sheath posteriorly. Colloquially termed the "white of the eye," the sclera provides structural rigidity, maintains intraocular pressure, and serves as the insertion anchor site for the six extraocular muscles controlling eye movements.',
          anatomyAndHistology: 'Histologically, the sclera consists of three layers: (1) The episclera, a vascularized connective tissue layer; (2) The scleral stroma, comprised of thick, irregularly interwoven Type I collagen bundles and elastic fibers intermixed with fibroblasts; and (3) The lamina fusca, a brownish inner layer containing abundant melanocytes bordering the choroid. Unlike the regular parallel lattice of the clear cornea, the irregular random branching of scleral collagen fibers scatters light rays, rendering the tissue opaque white.',
          physiologyAndMechanisms: 'The high tensile strength of scleral collagen enables the eyeball to withstand fluctuations in intraocular pressure (normally 10 to 21 mmHg) without undergoing structural distortion. Furthermore, evolutionary biologists note that the stark white coloration of human sclera (cooperative eye hypothesis) evolved to facilitate non-verbal gaze tracking and social communication, unique among primates.',
          clinicalSignificance: 'Scleritis is a severe, painful inflammatory destruction of the sclera often associated with systemic autoimmune disorders like rheumatoid arthritis. Scleral icterus (yellowing of the sclera) occurs when serum bilirubin levels rise above 2.5 mg/dL due to hepatic dysfunction, biliary obstruction, or hemolysis, as bilirubin binds readily to scleral elastin fibers.'
        }
      },
      {
        id: 'vitreous-humor',
        name: 'Vitreous Humor',
        pronunciation: 'VIT-ree-us HYOO-mer',
        category: 'Gel Matrix',
        description: 'A clear, gel-like substance filling the large cavity behind the lens and in front of the retina.',
        functionSummary: 'Helps the eye keep its round shape and holds the retina firmly against the back wall.',
        analogy: 'Water or clear gel filling a water balloon to maintain its firmness.',
        clinicalNote: 'Microscopic clumps of protein floating in the vitreous cast tiny shadows on the retina, known as "eye floaters".',
        funFact: 'The vitreous humor is formed during fetal development and is never replaced—the gel you have today is the same gel you were born with!',
        svgCoords: { x: 360, y: 200 },
        color: '#67E8F9',
        essay: {
          overview: 'The vitreous humor (vitreous body) is a transparent, colorless, gelatinous hydrogel filling the vitreous cavity—the largest structural compartment of the eye, occupying approximately 80% of total ocular volume (~4 mL). Positioned behind the lens and in front of the retina, the vitreous maintains the spherical shape of the globe, cushions internal structures against mechanical trauma, and holds the neurosensory retina flattened against the underlying pigment epithelium.',
          anatomyAndHistology: 'Composed of 99% water, the remaining 1% of the vitreous gel matrix consists of a three-dimensional meshwork of Type II collagen fibrils cross-linked with highly hydrated glycosaminoglycans, primarily hyaluronic acid. Dispersed sparsely throughout the peripheral gel are hyalocytes—specialized phagocytic cells that produce collagen and hyaluronic acid while clearing metabolic debris.',
          physiologyAndMechanisms: 'The high viscoelasticity of the vitreous enables it to act as a shock absorber during rapid saccadic eye movements. Because the gel is avascular and optical transparency is paramount, metabolic transport across the vitreous occurs via slow passive diffusion, allowing nutrient exchange between the anterior segment and retina.',
          clinicalSignificance: 'With normal aging, liquefaction of the collagen-hyaluronic acid matrix occurs (vitreous syneresis). The collapsing gel detaches from the retina, causing a Posterior Vitreous Detachment (PVD). As collagen strands aggregate, they cast microscopic shadows on the retina perceived by patients as "eye floaters." Traction during PVD can tear the retina, creating retinal tears or vitreous hemorrhage requiring surgical vitrectomy.'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-eye-1',
        question: 'Which part of the eye acts like a camera aperture to regulate how much light enters?',
        options: ['Retina', 'Iris', 'Optic Nerve', 'Sclera'],
        correctAnswerIndex: 1,
        explanation: 'The Iris is the colored muscle ring that expands or contracts the Pupil to adjust incoming light levels.',
        funFact: 'In bright sunlight, your pupil can shrink down to just 2 millimeters in diameter!'
      },
      {
        id: 'q-eye-2',
        question: 'Where are photoreceptors (rods and cones) located in the eye?',
        options: ['Cornea', 'Vitreous Humor', 'Retina', 'Lens'],
        correctAnswerIndex: 2,
        explanation: 'The Retina coats the back of the eyeball and contains rods (light sensitivity) and cones (color vision).',
        funFact: 'Your retina has approximately 120 million rods and 6 million cones!'
      },
      {
        id: 'q-eye-3',
        question: 'Why does the human eye have a natural "Blind Spot"?',
        options: ['Because the lens blocks light in one corner', 'Where the Optic Nerve passes through the retina lacking photoreceptors', 'Because the cornea is cloudy near the rim', 'Due to shadows cast by eyelashes'],
        correctAnswerIndex: 1,
        explanation: 'The optic disk lacks rod and cone photoreceptors because optic nerve fibers exit through that exact point, creating a blind spot.',
        funFact: 'Your brain automatically fills in the blind spot using visual information from surrounding areas!'
      }
    ]
  },

  brain: {
    id: 'brain',
    title: 'The Human Brain',
    systemName: 'Central Nervous System Control Center',
    subtitle: 'The Command Center of Consciousness & Thought',
    accentColor: '#8B5CF6', // Purple
    bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    description: 'Containing over 86 billion neurons, the brain processes sensory information, generates thoughts, controls movements, and regulates bodily functions.',
    keyFunctions: [
      'Executes higher cognition, planning & reasoning (Frontal Lobe)',
      'Processes visual stimuli from eyes (Occipital Lobe)',
      'Coordinates smooth motor movements & balance (Cerebellum)',
      'Controls autonomic survival functions like heart rate (Brainstem)'
    ],
    labControls: {
      title: 'Neural Function & Pathway Simulator',
      description: 'Select an everyday activity (e.g. Catching a Ball, Reading a Book, Listening to Music) to see which brain regions activate in real-time sequence.'
    },
    parts: [
      {
        id: 'frontal-lobe',
        name: 'Frontal Lobe',
        pronunciation: 'FRUN-tul LOHB',
        category: 'Executive Control',
        description: 'The largest lobe located at the front of the brain. Houses the Prefrontal Cortex and Primary Motor Cortex.',
        functionSummary: 'Responsible for decision making, problem solving, reasoning, impulse control, personality, and voluntary muscle movement.',
        analogy: 'The CEO or Chief Operations Manager sitting in the executive corner office.',
        clinicalNote: 'Damage to the frontal lobe can result in dramatic personality shifts and difficulties with long-term planning.',
        funFact: 'The frontal lobe is the last brain region to fully mature, completing development around age 25!',
        svgCoords: { x: 180, y: 140 },
        color: '#EC4899',
        essay: {
          overview: 'The frontal lobe is the largest of the four major lobes of the cerebral cortex, occupying the anterior portion of each cerebral hemisphere. Functioning as the executive neural control center, the frontal lobe orchestrates high-level cognitive processes, voluntary motor control, language production (Broca\'s area), working memory, decision making, emotional regulation, and social behavior. It represents the evolutionary pinnacle of mammalian brain architecture.',
          anatomyAndHistology: 'Anatomically, the frontal lobe extends from the anterior pole of the brain back to the central sulcus (which separates it from the parietal lobe) and rests superior to the lateral sulcus. It is organized into distinct functionally specialized cortical sub-regions: (1) The Prefrontal Cortex (PFC), divided into dorsolateral, ventromedial, and orbitofrontal zones; (2) The Primary Motor Cortex (Brodmann area 4) located in the precentral gyrus; (3) The Premotor and Supplementary Motor Cortices; and (4) Broca\'s area (Brodmann areas 44 and 45) in the inferior frontal gyrus of the dominant hemisphere. Histologically, it exhibits a six-layered neocortical laminations packed with excitatory pyramidal neurons and inhibitory GABAergic interneurons.',
          physiologyAndMechanisms: 'Voluntary motor execution originates in the primary motor cortex, where giant Betz pyramidal cells project long upper motor neuron axons down the corticospinal tract through the internal capsule and brainstem to synapse on lower motor neurons in the spinal cord. Executive functioning in the prefrontal cortex relies on complex dopaminergic and serotonergic circuits that maintain representations in working memory, evaluate risk versus reward, inhibit socially inappropriate impulses, and sequence complex goal-directed actions.',
          clinicalSignificance: 'Damage to the frontal lobe results in dramatic neurological and psychiatric deficits. The famous historical case of Phineas Gage demonstrated that orbitofrontal lesioning alters personality, producing disinhibition, impulsivity, and social inappropriateness. Lesions in Broca\'s area cause Broca\'s expressive aphasia, where patients understand spoken language but struggle to articulate fluent speech. Prefrontal cortex dysfunction is heavily implicated in ADHD, schizophrenia, and depression.'
        }
      },
      {
        id: 'parietal-lobe',
        name: 'Parietal Lobe',
        pronunciation: 'puh-RYE-uh-tul LOHB',
        category: 'Somatosensory Center',
        description: 'Positioned near the upper back top of the brain behind the frontal lobe.',
        functionSummary: 'Processes sensory input such as touch, temperature, pressure, pain, spatial orientation, and navigation.',
        analogy: 'A GPS system combined with a tactile touchscreen controller.',
        clinicalNote: 'Damage can lead to "spatial neglect", where a person ignores one side of their body or visual field.',
        funFact: 'Albert Einstein’s parietal lobe was found to be 15% wider than average, which scientists think aided his spatial visual thinking!',
        svgCoords: { x: 330, y: 120 },
        color: '#3B82F6',
        essay: {
          overview: 'The parietal lobe is located superior to the temporal lobe and posterior to the frontal lobe, demarcated anteriorly by the central sulcus and posteriorly by the parieto-occipital sulcus. Serving as the primary integration hub for somatosensory perception, spatial awareness, and multimodal sensory fusion, the parietal lobe enables organisms to construct an internal spatial map of both their physical body and surrounding environment.',
          anatomyAndHistology: 'Key anatomical landmarks include the postcentral gyrus (housing the Primary Somatosensory Cortex, Brodmann areas 3, 1, and 2), the Superior Parietal Lobule, and the Inferior Parietal Lobule (comprising the Supramarginal and Angular gyri). The somatosensory cortex is organized topologically according to a sensory "homunculus," where body parts with dense mechanoreceptor innervation (such as the fingertips, lips, and tongue) occupy disproportionately large areas of cortical surface.',
          physiologyAndMechanisms: 'Somatosensory signals originating from skin mechanoreceptors, nociceptors, and muscle spindle proprioceptors travel up the dorsal column-medial lemniscal pathway and spinothalamic tract to the thalamus, projecting directly to the primary somatosensory cortex. Superior parietal structures combine these somatosensory streams with visual inputs from the occipital lobe\'s "dorsal stream" (where pathway), computing real-time coordinate transformations necessary for reach-to-grasp motor movements and spatial navigation.',
          clinicalSignificance: 'Damage to the non-dominant (right) parietal lobe often produces hemispatial neglect, a profound deficit where patients fail to perceive or respond to objects, people, or even their own limbs located on the left side of space. Lesions in the dominant parietal lobe (specifically the angular gyrus) cause Gerstmann syndrome, characterized by dysgraphia, dyscalculia, finger agnosia, and right-left confusion.'
        }
      },
      {
        id: 'occipital-lobe',
        name: 'Occipital Lobe',
        pronunciation: 'ok-SIP-i-tul LOHB',
        category: 'Visual Processing Center',
        description: 'Located at the very back of the skull above the cerebellum.',
        functionSummary: 'Houses the primary visual cortex; interprets shape, color, motion, distance, and visual recognition.',
        analogy: 'A dedicated graphics processing card (GPU) inside a gaming supercomputer.',
        clinicalNote: 'A bump to the back of the head can cause you to "see stars" because it directly jostles the visual cortex in the occipital lobe!',
        funFact: 'Even though light enters through the front eyes, visual awareness is produced at the very back of your head!',
        svgCoords: { x: 440, y: 180 },
        color: '#10B981',
        essay: {
          overview: 'The occipital lobe is the rearmost anatomical division of the cerebral hemisphere, resting atop the tentorium cerebelli. It serves as the dedicated visual processing engine of the mammalian brain, transforming raw electrical signals transmitted from the eyes via the optic radiation into conscious visual perception including form, motion, color, spatial frequency, and object recognition.',
          anatomyAndHistology: 'The core anatomical feature of the occipital lobe is the primary visual cortex (V1, or Striate Cortex, Brodmann area 17), situated along the walls of the calcarine sulcus. Histologically, Layer 4 of V1 exhibits a prominent myelinated fiber band known as the Stria of Gennari, visible even to the naked eye. Surrounding V1 are the extrastriate visual areas V2, V3, V4 (specialized for color processing), and V5/MT (specialized for motion perception).',
          physiologyAndMechanisms: 'Retinal ganglion cell axons synapse in the lateral geniculate nucleus (LGN) of the thalamus, which projects via the optic radiations to Layer 4C of V1. Neurons in V1 are organized into functional ocular dominance columns and orientation columns, responding preferentially to line segments at specific angles. From V1, visual information diverges into two processing streams: the Ventral Stream ("What" pathway extending into the temporal lobe for object and face identification) and the Dorsal Stream ("Where/How" pathway extending into the parietal lobe for spatial motion tracking).',
          clinicalSignificance: 'Complete unilateral destruction of V1 causes contralateral homonymous hemianopia—loss of vision in the opposite visual field of both eyes. Akinetopsia ("motion blindness") occurs following bilateral lesions to area V5/MT, where patients perceive moving objects as a discontinuous series of still freeze-frames. Cortical blindness refers to total vision loss due to bilateral occipital lobe infarction, where the eyes themselves remain completely healthy.'
        }
      },
      {
        id: 'temporal-lobe',
        name: 'Temporal Lobe',
        pronunciation: 'TEM-puh-rul LOHB',
        category: 'Auditory & Memory Processing',
        description: 'Located at the sides of the brain near ear level on both left and right hemispheres.',
        functionSummary: 'Processes auditory signals (hearing), language comprehension (Wernicke’s Area), and houses key memory structures like the Hippocampus.',
        analogy: 'An audio sound mixing board connected to a library archiving department.',
        clinicalNote: 'Seizures originating in the temporal lobe often trigger vivid visual or auditory flashbacks and feelings of déjà vu.',
        funFact: 'The temporal lobe allows you to recognize faces in less than 100 milliseconds!',
        svgCoords: { x: 310, y: 230 },
        color: '#F59E0B',
        essay: {
          overview: 'The temporal lobe is situated inferior to the lateral sulcus across both left and right cerebral hemispheres. It is a multifunctional neural cortex responsible for primary auditory perception, language comprehension, visual high-level object and face recognition, emotion processing, and episodic memory consolidation via embedded limbic structures.',
          anatomyAndHistology: 'Key neocortical regions include: (1) The Superior Temporal Gyrus, containing the Primary Auditory Cortex (Heschl\'s gyri, Brodmann areas 41/42) and Wernicke\'s Area (Brodmann area 22) in the dominant hemisphere; (2) The Inferotemporal Cortex; and (3) The Fusiform Gyrus (containing the Fusiform Face Area, FFA). Deep within the medial temporal lobe lie medial limbic structures: the Hippocampus, Entorhinal Cortex, and Amygdala.',
          physiologyAndMechanisms: 'Auditory impulses originating in the cochlea travel via the vestibulocochlear nerve (CN VIII) through the brainstem and medial geniculate nucleus (MGN) to the Primary Auditory Cortex, organized tonotopically by pitch frequencies. In the dominant hemisphere, Wernicke\'s area decodes complex acoustic phonemes into semantic language meaning. Concurrently, ventral visual stream inputs enter the Fusiform Face Area, utilizing specialized neural ensembles to recognize familiar human facial features instantly.',
          clinicalSignificance: 'Damage to Wernicke\'s area produces Wernicke\'s receptive aphasia: patients speak fluently with natural cadence but their speech lacks coherent meaning ("word salad"), and they cannot comprehend spoken language. Damage to the fusiform gyrus causes prosopagnosia—the inability to recognize faces, even those of immediate family members. Temporal lobe epilepsy is the most common form of focal epilepsy, frequently preceded by auditory hallucinations, olfactory auras, or intense déjà vu.'
        }
      },
      {
        id: 'cerebellum',
        name: 'Cerebellum ("Little Brain")',
        pronunciation: 'sair-uh-BELL-um',
        category: 'Motor Coordination',
        description: 'A cauliflower-shaped structure tucked underneath the back of the cerebrum.',
        functionSummary: 'Coordinates muscle timing, balance, posture, and fine motor skills (like typing, playing piano, or riding a bike).',
        analogy: 'A high-precision gyroscope and motion stabilizer in a drone flight controller.',
        clinicalNote: 'Alcohol affects the cerebellum quickly, leading to loss of balance and uncoordinated movement.',
        funFact: 'Despite taking up only 10% of total brain volume, the cerebellum contains over 50% of all neurons in the human brain!',
        svgCoords: { x: 420, y: 290 },
        color: '#8B5CF6',
        essay: {
          overview: 'The cerebellum ("little brain") is a highly folded structure nestled in the posterior cranial fossa beneath the occipital lobes and posterior to the pons and medulla. Although it does not initiate motor commands, the cerebellum acts as an indispensable real-time error-correction engine, comparator, and motor timing calculator that ensures voluntary muscular movements are smooth, balanced, precisely timed, and accurately targeted.',
          anatomyAndHistology: 'The cerebellum consists of two lateral hemispheres connected by a central midline ridge called the vermis, organized into anterior, posterior, and flocculonodular lobes. Its cortex exhibits a uniform three-layered histological structure: (1) An outer Molecular Layer; (2) A single monolayer of massive Purkinje Cells with elaborate dendritic trees; and (3) An inner Granule Cell Layer packed with over 50 billion microscopic granule cells. Output from Purkinje cells projects exclusively down to the Deep Cerebellar Nuclei (dentate, emboliform, globose, and fastigial nuclei).',
          physiologyAndMechanisms: 'The cerebellum operates as a predictive feedback comparator loop. It receives an "intention signal" (motor plan copy) from the motor cortex via mossy fibers, while simultaneously receiving real-time "execution feedback" (proprioceptive status of muscles and joints) via climbing fibers from the inferior olive and spinocerebellar tracts. By comparing intended movement against actual physical trajectory, Purkinje cells send inhibitory signals back to the motor cortex and brainstem to correct motor errors on the fly.',
          clinicalSignificance: 'Cerebellar damage produces characteristic cerebellar ataxia—uncoordinated, clumsy movements. Clinical manifestations include dysmetria (overshooting or undershooting a target), intention tremor (shaking that worsens as the hand approaches a target), dysdiadochokinesia (inability to perform rapid alternating movements), slurred scanning speech, and a wide-based unsteady gait. Alcohol rapidly depresses cerebellar Purkinje cell activity, explaining the classic motor intoxication signs tested during roadside sobriety exams.'
        }
      },
      {
        id: 'brainstem',
        name: 'Brainstem (Midbrain, Pons, Medulla)',
        pronunciation: 'BRAYN-stem',
        category: 'Autonomic Life Support',
        description: 'The stalk-like base of the brain that connects the cerebral cortex to the spinal cord.',
        functionSummary: 'Controls involuntary life-sustaining vital functions: heart rate, breathing, blood pressure, swallowing, and sleep/wake cycles.',
        analogy: 'The master power breaker panel and automated building life-support generator.',
        clinicalNote: 'Because the brainstem controls breathing and heart beat, injuries to this region are life-threatening.',
        funFact: 'Your brainstem keeps you breathing and your heart pumping smoothly even while you are fast asleep!',
        svgCoords: { x: 330, y: 320 },
        color: '#EF4444',
        essay: {
          overview: 'The brainstem is the stalk-like inferior portion of the brain connecting the diencephalon and cerebral hemispheres to the spinal cord. Comprising three continuous anatomical segments—the Midbrain (mesencephalon), Pons, and Medulla Oblongata—the brainstem serves as the master autonomic control tower of human physiology. It houses vital reflex centers governing cardiorespiratory survival, serves as the passageway for all ascending sensory and descending motor pathways, and anchors 10 of the 12 cranial nerves (CN III through CN XII).',
          anatomyAndHistology: 'The Midbrain contains the superior/inferior colliculi (visual and auditory reflexes), cerebral peduncles, and the dopaminergic Substantia Nigra. The Pons contains massive transverse fibers routing information to the cerebellum, as well as pneumotaxic respiratory centers. The Medulla Oblongata contains the pyramid decussation (where 90% of corticospinal motor tracts cross) and autonomic centers controlling heart rate, vascular tone, coughing, vomiting, and swallowing. Running through the core of the entire brainstem is the Reticular Activating System (RAS).',
          physiologyAndMechanisms: 'Autonomic cardiorespiratory control in the medulla relies on central chemoreceptors sensing arterial pH and CO2 levels in cerebrospinal fluid (CSF). When CO2 rises, medullary respiratory centers fire action potentials down the phrenic nerve (C3-C5) to accelerate diaphragm contractions. Concurrently, the Reticular Activating System (RAS) projects ascending cholinergic and adrenergic pathways to the thalamus and cortex, maintaining state of alertness and consciousness.',
          clinicalSignificance: 'Lesions or mechanical compression of the brainstem (such as tonsillar herniation through the foramen magnum secondary to high ICP) are rapidly fatal due to respiratory arrest and cardiovascular collapse. Brainstem strokes can cause "Locked-In Syndrome" (basilar artery thrombosis), where patients retain full conscious cognitive awareness but suffer complete paralysis of all voluntary muscles except vertical eye movements. Brainstem death forms the definitive legal and medical criteria for brain death.'
        }
      },
      {
        id: 'hippocampus',
        name: 'Hippocampus',
        pronunciation: 'hip-uh-KAM-pus',
        category: 'Memory Encoder',
        description: 'A seahorse-shaped deep subcortical structure located inside the temporal lobe.',
        functionSummary: 'Essential for converting short-term experiences into long-term memories and navigating physical space.',
        analogy: 'The "Save As..." hard drive writing mechanism of a computer system.',
        clinicalNote: 'Alzheimer’s disease typically damages the hippocampus first, causing early symptoms of short-term memory loss.',
        funFact: 'London taxi drivers undergo intense memory training ("The Knowledge") and have significantly larger hippocampi as a result!',
        svgCoords: { x: 290, y: 210 },
        color: '#06B6D4',
        essay: {
          overview: 'The hippocampus (named from the Greek for "seahorse" due to its curved shape) is a bilateral subcortical structure located deep within the medial temporal lobe, forming a key component of the limbic system. It serves as the master gatekeeper for memory encoding, responsible for consolidating fragile short-term memories into stable long-term memories (declarative and episodic memory) and providing spatial cognitive mapping for environmental navigation.',
          anatomyAndHistology: 'Histologically, the hippocampus belongs to the archicortex (three-layered cortex) and comprises three distinct regions forming the trisynaptic circuit: the Dentate Gyrus, the Hippocampus Proper (subdivided into Cornu Ammonis fields CA1, CA2, and CA3), and the Subiculum. The trisynaptic circuit routes information sequentially: Entorhinal cortex -> perforant pathway -> Dentate gyrus granule cells -> mossy fibers -> CA3 pyramidal cells -> Schaffer collaterals -> CA1 pyramidal cells -> Subiculum output.',
          physiologyAndMechanisms: 'Synaptic plasticity in the hippocampus is mediated by Long-Term Potentiation (LTP)—a persistent strengthening of synapses based on recent patterns of activity. High-frequency electrical stimulation of NMDA glutamate receptors triggers intracellular calcium influx, recruiting additional AMPA receptors to the postsynaptic membrane and strengthening synaptic transmission. Additionally, the hippocampus houses specialized "Place Cells" that fire action potentials whenever an organism enters a specific spatial location, constructing a real-time cognitive spatial map.',
          clinicalSignificance: 'Bilateral hippocampal destruction causes severe anterograde amnesia—the complete inability to form new long-term declarative memories, famously demonstrated by patient H.M. (Henry Molaison). The hippocampus is uniquely vulnerable to oxidative stress and excitotoxicity, making it one of the earliest brain structures damaged in Alzheimer\'s disease (causing progressive short-term memory failure) and temporal lobe epilepsy.'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-brain-1',
        question: 'Which brain lobe is primarily responsible for decision making, problem solving, and voluntary movement?',
        options: ['Occipital Lobe', 'Frontal Lobe', 'Temporal Lobe', 'Parietal Lobe'],
        correctAnswerIndex: 1,
        explanation: 'The Frontal Lobe manages high-level executive functions, planning, and motor output.',
        funFact: 'The prefrontal cortex within the frontal lobe continues refining its connections until your mid-20s!'
      },
      {
        id: 'q-brain-2',
        question: 'Which structure sits at the back base of the brain and coordinates balance and fine motor timing?',
        options: ['Brainstem', 'Hippocampus', 'Cerebellum', 'Thalamus'],
        correctAnswerIndex: 2,
        explanation: 'The Cerebellum ("little brain") fine-tunes motor coordination, posture, and muscle memory.',
        funFact: 'The cerebellum holds more than half of all neurons in your entire brain!'
      }
    ]
  },

  heart: {
    id: 'heart',
    title: 'The Human Heart',
    systemName: 'Cardiovascular System Engine',
    subtitle: 'The Unstoppable Muscular Pump',
    accentColor: '#EF4444', // Crimson red
    bgGradient: 'from-rose-500/10 via-red-500/5 to-transparent',
    description: 'A hollow muscular organ roughly the size of a closed fist that beats ~100,000 times per day, circulating ~2,000 gallons of blood throughout the body.',
    keyFunctions: [
      'Pumps oxygen-depleted blood to lungs via Pulmonary Circulation',
      'Receives fresh oxygenated blood from lungs',
      'Propels oxygen-rich blood to systemic tissue via the Aorta',
      'Maintains blood pressure and tissue perfusion'
    ],
    labControls: {
      title: 'Cardiac Rhythm & Circulation Simulator',
      description: 'Adjust the Heart Rate (BPM) slider to see chamber contraction speeds, valve action, and red/blue blood flow pathways in real-time.'
    },
    parts: [
      {
        id: 'right-atrium',
        name: 'Right Atrium',
        pronunciation: 'RYT AY-tree-um',
        category: 'Receiving Chamber (Deoxygenated)',
        description: 'The upper right chamber of the heart that receives oxygen-poor blood returning from the rest of the body via superior and inferior vena cava.',
        functionSummary: 'Collects low-oxygen blood and contracts to push it through the Tricuspid Valve into the Right Ventricle.',
        analogy: 'An entry holding bay receiving return delivery trucks.',
        clinicalNote: 'Atrial fibrillation (AFib) is an irregular quiver in the atria that can lead to blood pooling.',
        funFact: 'The right atrium contains the SA Node (Sinoatrial Node), your body’s natural intrinsic electrical pacemaker!',
        svgCoords: { x: 180, y: 170 },
        color: '#3B82F6',
        essay: {
          overview: 'The right atrium is the thin-walled superior receiving chamber positioned on the right anterior side of the heart. It serves as the primary collection reservoir for systemic venous return, receiving oxygen-depleted (deoxygenated) blood from the entire body via the superior vena cava, inferior vena cava, and coronary sinus, and delivering it through the tricuspid valve into the right ventricle.',
          anatomyAndHistology: 'Histologically, the inner wall of the anterior right atrium features parallel muscular ridges known as pectinate muscles, whereas the posterior wall (sinus venarum) is smooth. Key internal anatomical structures include the fossa ovalis (the remanent of the fetal foramen ovale), the limbus, and the crista terminalis. Crucially, embedded in the superior wall of the right atrium near the junction of the superior vena cava lies the Sinoatrial (SA) Node—the primary electrical pacemaker of the heart.',
          physiologyAndMechanisms: 'Venous blood enters the right atrium continuously during ventricular systole and early diastole. As atrial pressure exceeds right ventricular pressure in early diastole, the tricuspid valve opens, allowing blood to flow passively into the right ventricle (70-80% of filling). Near the end of diastole, spontaneous depolarization of the SA node spreads across atrial cardiac myocytes via gap junctions, triggering atrial contraction ("atrial kick") which forcefully ejects the remaining 20-30% of blood into the ventricle.',
          clinicalSignificance: 'Atrial Fibrillation (AFib) is the most common cardiac arrhythmia, characterized by chaotic, disorganized electrical impulses across the atria (300-600 bpm). This leads to loss of the coordinated "atrial kick" and blood stasis within the left and right atrial appendages, dramatically increasing the risk of thromboembolic stroke. Elevated Right Atrial Pressure (RAP) clinically manifests as Jugular Venous Distension (JVD), a classic sign of right-sided heart failure or cardiac tamponade.'
        }
      },
      {
        id: 'right-ventricle',
        name: 'Right Ventricle',
        pronunciation: 'RYT VEN-tri-kul',
        category: 'Pumping Chamber (Deoxygenated)',
        description: 'The lower right chamber of the heart with muscular walls.',
        functionSummary: 'Pumps oxygen-poor blood through the Pulmonary Valve into Pulmonary Arteries heading toward the lungs.',
        analogy: 'A specialized water pump sending water to a filtration plant.',
        clinicalNote: 'Because it only needs to send blood to nearby lungs, its wall muscle is thinner than the left ventricle.',
        funFact: 'The right ventricle generates lower pressure than the left ventricle to prevent damaging delicate lung alveoli capillaries!',
        svgCoords: { x: 210, y: 270 },
        color: '#60A5FA',
        essay: {
          overview: 'The right ventricle is the crescent-shaped muscular anterior chamber of the heart responsible for propelling deoxygenated blood through the low-resistance pulmonary circulation. By generating systolic pressures sufficient to drive blood through the pulmonary trunk and pulmonary arteries to the pulmonary capillary beds, the right ventricle enables essential alveolar gas exchange.',
          anatomyAndHistology: 'Anatomically, the right ventricle wraps around the thick left ventricle, separated by the interventricular septum. Its internal wall exhibits heavy muscular ridges called trabeculae carneae. Papillary muscles arise from the ventricular wall and attach via fibrous chordae tendineae ("heart strings") to the cusps of the tricuspid valve. The outflow tract leads smoothly into the infundibulum (conus arteriosus) leading to the pulmonary semilunar valve.',
          physiologyAndMechanisms: 'During ventricular systole, depolarizing electrical waves travel down the Right Bundle Branch of the Bundle of His and Purkinje fiber network. As ventricular myocardium contracts, intraventricular pressure rises rapidly, snapping the tricuspid valve shut (producing the first heart sound, S1 "lub") to prevent regurgitation. Once right ventricular pressure exceeds pulmonary artery pressure (~15-25 mmHg), the pulmonary valve opens, ejecting blood into the pulmonary trunk.',
          clinicalSignificance: 'Right Ventricular Hypertrophy (RVH) occurs when the right ventricle thickens in response to chronic high pressures in the lungs, a condition termed Pulmonary Arterial Hypertension (PAH). Cor Pulmonale refers to right ventricular enlargement and failure secondary to chronic lung diseases like COPD. Acute pulmonary embolism (a blood clot lodging in the pulmonary artery) can cause sudden right ventricular overload and acute right heart failure.'
        }
      },
      {
        id: 'left-atrium',
        name: 'Left Atrium',
        pronunciation: 'LEFT AY-tree-um',
        category: 'Receiving Chamber (Oxygenated)',
        description: 'The upper left chamber receiving fresh, bright-red oxygenated blood returning from the lungs via pulmonary veins.',
        functionSummary: 'Holds oxygen-rich blood and squeezes it through the Mitral (Bicuspid) Valve into the Left Ventricle.',
        analogy: 'The clean intake tank holding filtered water ready for distribution.',
        clinicalNote: 'Mitral valve prolapse occurs when the valve between left atrium and ventricle doesn’t close smoothly.',
        funFact: 'Pulmonary veins are unique: they are the ONLY veins in the human body that carry oxygen-rich blood!',
        svgCoords: { x: 320, y: 170 },
        color: '#EF4444',
        essay: {
          overview: 'The left atrium is the smooth, posterior-most chamber of the heart. Positioned directly anterior to the esophagus and thoracic aorta, it acts as the primary collecting chamber for freshly oxygenated blood returning from the pulmonary capillary beds via four pulmonary veins (two left and two right pulmonary veins), propelling this oxygen-rich blood through the mitral valve into the left ventricle.',
          anatomyAndHistology: 'In contrast to the right atrium, the vast majority of the inner wall of the left atrium is completely smooth, derived embryologically from incorporated pulmonary vein tissue. Pectinate muscles are restricted strictly to the tubular Left Atrial Appendage (LAA). The interatrial septum forms its anterior wall, featuring the thin valve fossa of the fossa ovalis.',
          physiologyAndMechanisms: 'Oxygenated blood drains continuously into the left atrium from the pulmonary veins without valvular restriction. During diastole, as left ventricular pressure drops, the mitral valve opens and blood cascades passively into the left ventricle. During late diastole, atrial systole contracts the left atrium, increasing ventricular end-diastolic volume (preload) to optimize systemic cardiac output according to the Frank-Starling law.',
          clinicalSignificance: 'The Left Atrial Appendage (LAA) is the primary anatomical origin site (>90%) for stroke-inducing blood clots in patients suffering from non-valvular Atrial Fibrillation. Because the left atrium lies directly anterior to the esophagus, Transesophageal Echocardiography (TEE) provides crystal-clear ultrasound visualization of the left atrium and mitral valve. Left atrial enlargement occurs in mitral stenosis and chronic systemic hypertension.'
        }
      },
      {
        id: 'left-ventricle',
        name: 'Left Ventricle',
        pronunciation: 'LEFT VEN-tri-kul',
        category: 'Master Powerhouse Chamber',
        description: 'The largest and most muscular chamber of the heart located on the lower left side.',
        functionSummary: 'Contracts forcefully to shoot oxygenated blood through the Aortic Valve out to the entire body.',
        analogy: 'The high-pressure main engine water cannon.',
        clinicalNote: 'Because it pumps blood against systemic body pressure, its muscular myocardium wall is 3 times thicker than the right ventricle!',
        funFact: 'The left ventricle generates enough pressure that, if detached, it could squirt blood up to 30 feet in the air!',
        svgCoords: { x: 290, y: 290 },
        color: '#DC2626',
        essay: {
          overview: 'The left ventricle is the conical, thick-walled muscular powerhouse of the mammalian cardiovascular system. Tasked with generating high systolic pressures (normally 120 mmHg) to pump oxygenated blood throughout the high-resistance systemic vascular bed, the left ventricle performs the vast majority of the heart\'s mechanical work, making its performance the paramount determinant of systemic tissue perfusion.',
          anatomyAndHistology: 'To withstand high systemic workload, the left ventricular myocardium wall is three to four times thicker than that of the right ventricle (~10-15 mm thick vs. 3-5 mm). Its muscular fibers are arranged in helical, spiral layers that twist and wring during contraction. It contains two large papillary muscles (anterolateral and posteromedial) anchored via chordae tendineae to the two cusps of the mitral valve.',
          physiologyAndMechanisms: 'Left ventricular excitation originates at the AV node, traveling down the Left Bundle Branch to depolarize the thick ventricular myocardium. Isovolumetric contraction rapidly raises intraventricular pressure, slamming the mitral valve shut. Once left ventricular pressure exceeds systemic aortic diastolic pressure (~80 mmHg), the aortic valve forced open, rapidly ejecting ~70 mL of blood (Stroke Volume) into the ascending aorta. Cardiac Output (CO) equals Stroke Volume times Heart Rate (CO = SV × HR).',
          clinicalSignificance: 'Left Ventricular Hypertrophy (LVH) occurs when chronic systemic hypertension forces the myocardium to thicken pathologically, reducing lumen volume and diastolic compliance. Myocardial Infarction (heart attack) most commonly affects the left ventricle due to coronary artery atherosclerosis (e.g. occlusion of the Left Anterior Descending, LAD, "widowmaker" artery), leading to irreversible ischemic necrosis, heart failure, or cardiogenic shock.'
        }
      },
      {
        id: 'aorta',
        name: 'Aorta',
        pronunciation: 'ay-OR-tuh',
        category: 'Master Artery',
        description: 'The largest blood vessel in the human body, arching up out of the left ventricle.',
        functionSummary: 'Distributes oxygen-rich blood into major arterial branches feeding the head, arms, organs, and legs.',
        analogy: 'The massive main municipal water highway trunk line departing a water treatment facility.',
        clinicalNote: 'An aortic aneurysm is a dangerous bulge in the wall of the aorta that requires monitoring or surgical repair.',
        funFact: 'The aorta in an adult human is about the same diameter as a standard garden hose (~1 inch wide)!',
        svgCoords: { x: 250, y: 90 },
        color: '#F43F5E',
        essay: {
          overview: 'The aorta is the largest, highest-pressure elastic artery in the human body, originating directly from the left ventricular outflow tract. Extending from the aortic valve through the thoracic cavity and down into the abdomen before bifurcating into the common iliac arteries, the aorta acts as the primary systemic arterial highway distributing oxygenated blood to every organ system.',
          anatomyAndHistology: 'Anatomically, the aorta is divided into four main regions: (1) Ascending Aorta (giving off coronary arteries), (2) Aortic Arch (giving off brachiocephalic trunk, left common carotid, and left subclavian arteries), (3) Thoracic Descending Aorta, and (4) Abdominal Aorta. Histologically, the aortic wall comprises three layers: Tunica Intima, Tunica Media (unusually rich in concentric elastic fiber lamellae and smooth muscle cells), and Tunica Adventitia.',
          physiologyAndMechanisms: 'Beyond serving as a conduit, the aorta exhibits the crucial Windkessel Effect. During ventricular systole, high ejection pressures expand the elastic aortic wall, dampening peak pressure spikes. During ventricular diastole, the elastic wall recoils, squeezing stored blood forward into systemic capillary beds and maintaining continuous blood flow even when the heart is relaxed.',
          clinicalSignificance: 'Aortic Aneurysm (thoracic or abdominal, AAA) is a pathologic dilation of the aortic wall secondary to elastic fiber degradation, posing a lethal rupture risk. Aortic Dissection is a catastrophic emergency where a tear in the tunica intima allows high-pressure blood to split open the tunica media layers, creating a false lumen that can occlude branch arteries or rupture.'
        }
      },
      {
        id: 'heart-valves',
        name: 'Heart Valves (Tricuspid, Mitral, Aortic, Pulmonary)',
        pronunciation: 'HART VALVZ',
        category: 'One-Way Check Valves',
        description: 'Four thin flap valves that open and snap shut with every heartbeat.',
        functionSummary: 'Prevents backward blood flow (regurgitation) and maintains one-way forward circulation through the cardiac cycle.',
        analogy: 'One-way swinging check valves in plumbing.',
        clinicalNote: 'The classic "lub-dub" sound of a heartbeat is actually the sound of heart valves snapping shut!',
        funFact: 'Your heart valves open and close over 3 billion times during a average human lifespan without breaking!',
        svgCoords: { x: 250, y: 220 },
        color: '#F59E0B',
        essay: {
          overview: 'The heart valves are four passive, pressure-driven mechanical check valves situated within the fibrous skeleton of the heart. Divided into Atrioventricular (AV) valves (Tricuspid and Mitral) and Semilunar valves (Aortic and Pulmonary), these elegant vascular structures enforce strictly unidirectional blood flow through the heart chambers, preventing retrograde regurgitation.',
          anatomyAndHistology: 'AV valves consist of fibrous leaflets (three cusps in Tricuspid, two in Mitral) anchored to ventricular papillary muscles by fibrous chordae tendineae. Semilunar valves (Aortic and Pulmonary) consist of three crescent-shaped pocket cusps rooted in the arterial roots without chordae tendineae attachments. Histologically, valve cusps are thin, avascular flaps made of dense collagenous fibrosa, spongiosa, and an outer endothelial lining.',
          physiologyAndMechanisms: 'Valve operation is completely passive, governed by hydrostatic pressure gradients across the valve. When atrial pressure exceeds ventricular pressure in diastole, AV valves push open. When ventricular myocardium contracts in systole, intraventricular pressure spikes, slamming AV valve leaflets closed; the tense chordae tendineae prevent the leaflets from prolapsing backward into the atria. Simultaneously, semilunar valves pop open as intraventricular pressure overcomes arterial pressure.',
          clinicalSignificance: 'Valvular Heart Disease encompasses Valve Stenosis (narrowing of the valve orifice restricting forward flow) and Valve Regurgitation/Incompetence (failure to close completely, allowing backflow). Rheumatic Fever secondary to streptococcal infection can cause permanent autoimmune scarring of valve leaflets. Severe valvular dysfunction requires surgical repair or prosthetic valve replacement (mechanical or bioprosthetic tissue valves).'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-heart-1',
        question: 'Which heart chamber has the thickest muscular wall because it pumps blood to the entire body?',
        options: ['Right Atrium', 'Left Ventricle', 'Right Ventricle', 'Left Atrium'],
        correctAnswerIndex: 1,
        explanation: 'The Left Ventricle has a wall roughly 3x thicker than the right side to pump blood throughout systemic circulation.',
        funFact: 'Your heart creates enough kinetic energy every day to drive a truck 20 miles!'
      },
      {
        id: 'q-heart-2',
        question: 'What creates the familiar "lub-dub" sound when listening to a heart with a stethoscope?',
        options: ['Blood rushing through the aorta', 'Heart muscle contracting against ribs', 'Heart valves snapping shut', 'Lungs expanding against the heart'],
        correctAnswerIndex: 2,
        explanation: 'The first sound ("lub") is the closing of AV valves (Tricuspid/Mitral); the second sound ("dub") is the closing of semilunar valves (Aortic/Pulmonary).',
        funFact: 'A stethoscope was originally invented in 1816 by a French physician who didn’t want to place his ear directly on patients’ chests!'
      }
    ]
  },

  lungs: {
    id: 'lungs',
    title: 'Lungs & Respiratory System',
    systemName: 'Gas Exchange & Respiratory Apparatus',
    subtitle: 'The Oxygen Supply & Carbon Dioxide Exhaust',
    accentColor: '#06B6D4', // Cyan
    bgGradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
    description: 'The respiratory system supplies body cells with life-giving Oxygen (O2) and eliminates toxic metabolic waste product Carbon Dioxide (CO2).',
    keyFunctions: [
      'Inhales atmospheric air into bronchial trees',
      'Performs microscopic gas exchange across ~300 million Alveoli',
      'Exhales CO2 and moisture',
      'Regulates blood pH levels via CO2 excretion'
    ],
    labControls: {
      title: 'Diaphragm & Alveolar Gas Exchange Lab',
      description: 'Toggle Inhalation/Exhalation to see Diaphragm pressure changes and zoom into an Alveolus capillary bed to watch red blood cells swap CO2 for fresh O2.'
    },
    parts: [
      {
        id: 'trachea',
        name: 'Trachea (Windpipe)',
        pronunciation: 'TRAY-kee-uh',
        category: 'Main Airway',
        description: 'A 4-inch rigid tube reinforced with C-shaped cartilage rings running from larynx to chest.',
        functionSummary: 'Provides a clear, non-collapsible airway for oxygen to travel toward the lungs.',
        analogy: 'A sturdy corrugated vacuum hose that refuses to kink or collapse.',
        clinicalNote: 'A tracheostomy is a surgical incision made in the trachea to bypass an obstructed upper airway.',
        funFact: 'The trachea is lined with microscopic microscopic hairs (cilia) that sweep dirt and mucus up and out like a miniature broom escalator!',
        svgCoords: { x: 250, y: 110 },
        color: '#38BDF8',
        essay: {
          overview: 'The trachea (windpipe) is a flexible, cylindrical cartilaginous tube forming the primary airway trunk of the respiratory system. Measuring roughly 10-12 cm in length and 2 cm in diameter in adults, it extends from the inferior margin of the cricoid cartilage in the neck (C6 level) down into the superior mediastinum, where it bifurcates at the carina (T4/T5 level) into the left and right primary bronchi.',
          anatomyAndHistology: 'Histologically, the tracheal wall comprises four concentric layers: (1) Mucosa, lined by pseudostratified ciliated columnar epithelium intermixed with mucus-secreting Goblet cells; (2) Submucosa, containing seromucous glands; (3) Fibrocartilaginous layer, containing 16 to 20 incomplete C-shaped hyaline cartilage rings interconnected posteriorly by the smooth Trachealis Muscle; and (4) Adventitia. The C-shaped cartilage rings provide structural rigidity preventing collapse during negative intrathoracic pressure generated during forceful inhalation.',
          physiologyAndMechanisms: 'The trachea serves as a vital component of the "mucociliary escalator." Goblet cells and submucosal glands secrete sticky mucus that traps inhaled foreign dust, particulate matter, and microbes. Cilia lining the tracheal epithelial cells beat synchronously at 10-15 Hz in a coordinated upward wave, propelling the mucus blanket superiorly toward the pharynx to be swallowed or expectorated.',
          clinicalSignificance: 'Tracheal Stenosis is pathological narrowing of the tracheal lumen, often following prolonged endotracheal intubation. Tracheostomy involves surgically creating an opening through the anterior neck into the second or third tracheal ring to secure a direct airway in patients with acute upper airway obstruction or requiring long-term mechanical ventilation.'
        }
      },
      {
        id: 'bronchi',
        name: 'Bronchi & Bronchioles',
        pronunciation: 'BRONG-kee / BRONG-kee-ohlz',
        category: 'Air Distribution Network',
        description: 'The main airway branches off into left/right primary bronchi, which divide into tiny smooth-muscle bronchiole tubules.',
        functionSummary: 'Distributes incoming air evenly across every section of lung tissue.',
        analogy: 'The branches and twigs of an upside-down tree trunk.',
        clinicalNote: 'In asthma, inflammation causes bronchial smooth muscles to spasm and narrow, making breathing difficult.',
        funFact: 'If you lined up all the bronchioles in human lungs end-to-end, they would stretch over 1,500 miles long!',
        svgCoords: { x: 200, y: 210 },
        color: '#0284C7',
        essay: {
          overview: 'The bronchial tree is a highly branched arborizing network of respiratory conduits conducting air from the trachea deep into the parenchyma of both lungs. Originating at the tracheal carina, the system bifurcates through approximately 23 progressive generations of division—transitioning from primary mainstem bronchi to lobar (secondary) bronchi, segmental (tertiary) bronchi, conducting bronchioles, and finally terminal and respiratory bronchioles.',
          anatomyAndHistology: 'As the bronchial tree branches deeper into lung tissue, its histological structure transitions continuously: the irregular hyaline cartilage plates seen in large bronchi diminish and disappear entirely in bronchioles (<1 mm diameter). Simultaneously, smooth muscle content increases relative to wall thickness, wrapped in helical bands around bronchiole walls. Epithelium transitions from pseudostratified columnar to simple cuboidal containing specialized non-ciliated Clara (Club) cells.',
          physiologyAndMechanisms: 'Airway resistance is dynamically regulated by autonomic neural input operating on bronchial smooth muscle. Parasympathetic cholinergic stimulation via the vagus nerve (CN X) triggers bronchoconstriction and mucus secretion, whereas sympathetic stimulation (and circulating epinephrine) activates beta-2 adrenergic receptors, causing bronchodilation to maximize airflow during physical exertion ("fight-or-flight" response).',
          clinicalSignificance: 'Asthma is a chronic inflammatory disorder characterized by hyper-responsive bronchial smooth muscle bronchospasm, mucosal edema, and mucus plugging, treated acutely with short-acting beta-2 agonists (albuterol inhalers). Chronic Bronchitis (a component of COPD) involves chronic mucosal inflammation and hypertrophy of bronchial glands, producing persistent productive cough.'
        }
      },
      {
        id: 'alveoli',
        name: 'Alveoli',
        pronunciation: 'al-VEE-uh-lye',
        category: 'Microscopic Gas Exchange Sacs',
        description: 'Clusters of microscopic air sacs surrounded by dense networks of microscopic capillaries.',
        functionSummary: 'Oxygen diffuses across the ultra-thin alveolar membrane into bloodstream RBCs, while Carbon Dioxide diffuses out to be exhaled.',
        analogy: 'Millions of microscopic wet bubbles providing massive surface area contact.',
        clinicalNote: 'Emphysema damages alveolar walls, drastically reducing surface area for gas exchange and causing shortness of breath.',
        funFact: 'You have over 300 to 500 million alveoli! If spread out flat, their surface area would cover an entire tennis court (~75 sq meters)!',
        svgCoords: { x: 330, y: 260 },
        color: '#22D3EE',
        essay: {
          overview: 'Alveoli are microscopic, thin-walled, polyhedral air sacs that form the primary functional gas exchange units (parenchyma) of the human lungs. Grouped in grape-like clusters at the ends of alveolar ducts, the human lungs contain roughly 300 to 500 million alveoli, presenting a colossal combined alveolar-capillary membrane surface area of approximately 70 to 100 square meters dedicated to rapid passive diffusion of respiratory gases.',
          anatomyAndHistology: 'The alveolar wall consists of two distinct cell populations resting on a basement membrane: (1) Type I Alveolar Cells (Pneumocytes)—extremely flattened simple squamous cells covering ~95% of alveolar surface, forming an ultra-thin (~0.2 to 0.5 micron) diffusion barrier with adjacent capillary endothelial cells; and (2) Type II Pneumocytes—cuboidal cells that synthesize and secrete Pulmonary Surfactant. Resident Alveolar Macrophages ("dust cells") patrol the lumen, phagocytosing inhaled particles.',
          physiologyAndMechanisms: 'Gas exchange occurs via simple passive diffusion governed by Fick\'s Law of Diffusion, driven by partial pressure gradients between alveolar air and pulmonary capillary blood. Oxygen moves down its partial pressure gradient from alveolar space (PO2 ~104 mmHg) into blood (PO2 ~40 mmHg), binding hemoglobin in red blood cells. Simultaneously, Carbon Dioxide diffuses from pulmonary capillary blood (PCO2 ~45 mmHg) into alveoli (PCO2 ~40 mmHg) to be exhaled. Pulmonary Surfactant (a complex mixture of dipalmitoylphosphatidylcholine, DPPC, and surfactant proteins) reduces surface tension at the air-water interface, preventing alveolar collapse (atelectasis) during exhalation according to the Law of Laplace.',
          clinicalSignificance: 'Infant Respiratory Distress Syndrome (IRDS) occurs in premature neonates lacking sufficient Type II pneumocyte maturation, leading to alveolar collapse without surfactant therapy. Emphysema (part of COPD) causes enzymatic destruction of elastic alveolar walls by neutrophil elastase, destroying capillary beds and trapping air in non-functional bullae.'
        }
      },
      {
        id: 'diaphragm',
        name: 'Diaphragm',
        pronunciation: 'DY-uh-fram',
        category: 'Primary Breathing Muscle',
        description: 'A dome-shaped sheet of skeletal muscle separating the chest cavity from the abdomen.',
        functionSummary: 'Contracts downwards to lower chest pressure, sucking air IN; relaxes upwards to push air OUT.',
        analogy: 'The plunger handle of a syringe pulling air or fluid inside.',
        clinicalNote: 'Involuntary spasms of the diaphragm accompanied by sudden closure of the vocal cords cause hiccups!',
        funFact: 'Your lungs do not have muscles of their own; they are inflated purely by the pressure changes created by the diaphragm and rib muscles!',
        svgCoords: { x: 250, y: 350 },
        color: '#F59E0B',
        essay: {
          overview: 'The diaphragm is a broad, dome-shaped musculotendinous sheet separating the thoracic cavity from the abdominal cavity. Functioning as the primary muscle of pulmonary respiration, its rhythmic, continuous contractions drive pulmonary ventilation by altering intrathoracic volume and generating the transpulmonary pressure gradients necessary for inhalation.',
          anatomyAndHistology: 'Anatomically, the diaphragm consists of a central aponeurotic tendinous sheet (Central Tendon) surrounded by peripheral muscular fibers originating from the xiphoid process anteriorly, lower six ribs laterally, and lumbar vertebrae posteriorly (via lumbar crura). It is pierced by three major anatomical apertures: (1) Vena Caval Foramen (T8 level), (2) Esophageal Hiatus (T10 level), and (3) Aortic Hiatus (T12 level). Motor innervation is supplied exclusively by the Phrenic Nerves (originating from spinal roots C3, C4, and C5: "C3, 4, 5 keep the diaphragm alive").',
          physiologyAndMechanisms: 'Ventilation is governed by Boyle\'s Law (Pressure is inversely proportional to Volume). During active inhalation, phrenic nerve stimulation causes the diaphragm to contract and flatten inferiorly, expanding thoracic cavity vertical height by 1 to 10 cm. This expansion lowers intrapulmonary pressure below atmospheric pressure (~ -1 to -3 mmHg relative to atmosphere), sucking air passively into the lungs down the pressure gradient. Normal quiet exhalation is passive: the diaphragm relaxes, returning to its elevated dome position as elastic recoil of lung tissue expels air.',
          clinicalSignificance: 'Phrenic Nerve Palsy (due to surgical trauma, cervical spinal injury, or tumor compression) leads to diaphragmatic paralysis, causing paradoxical elevation of the affected hemidiaphragm during inspiration. A Hiatal Hernia occurs when stomach tissue protrudes upward into the chest cavity through the esophageal hiatus of the diaphragm, often exacerbating severe GERD.'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-lungs-1',
        question: 'Where in the lungs does microscopic gas exchange (swapping O2 for CO2) actually take place?',
        options: ['Trachea', 'Alveoli', 'Larynx', 'Bronchial Cilia'],
        correctAnswerIndex: 1,
        explanation: 'Alveoli are tiny grape-like sacs wrapped in capillaries where simple diffusion swaps gases across thin membranes.',
        funFact: 'The barrier between air in an alveolus and blood in a capillary is less than 1/50th the thickness of a human hair!'
      }
    ]
  },

  skeleton: {
    id: 'skeleton',
    title: 'Musculoskeletal System',
    systemName: 'Skeletal Framework & Muscle Mechanics',
    subtitle: 'The Architectural Chassis & Biological Motors',
    accentColor: '#F59E0B', // Amber
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    description: 'The skeletal system (206 bones) provides structural support, organ protection, and mineral storage, while 600+ muscles exert pulling forces to create motion.',
    keyFunctions: [
      'Protects vital organs (Brain in Skull, Heart/Lungs in Ribcage)',
      'Provides rigid levers for locomotion and posture',
      'Produces red and white blood cells inside Bone Marrow',
      'Stores 99% of the body’s calcium and phosphorus reserves'
    ],
    labControls: {
      title: 'Joint Flexion & Antagonistic Muscle Simulator',
      description: 'Flex the elbow or knee joint to observe how Biceps contract (shorten) while Triceps extend (lengthen) in paired antagonistic muscular balance.'
    },
    parts: [
      {
        id: 'cranium',
        name: 'Skull (Cranium & Facial Bones)',
        pronunciation: 'KRAY-nee-um',
        category: 'Axial Skeleton Armor',
        description: 'Composed of 22 bones fused together by immovable interlocking joints called sutures.',
        functionSummary: 'Forms a rigid protective helmet around the fragile brain and anchors facial sensory organs.',
        analogy: 'A heavy-duty protective motorcycle helmet.',
        clinicalNote: 'Infants are born with soft gaps between skull bones called fontanelles ("soft spots") that allow the brain to grow rapidly.',
        funFact: 'The only movable bone in your entire skull is the lower jawbone (Mandible)!',
        svgCoords: { x: 250, y: 70 },
        color: '#CBD5E1',
        essay: {
          overview: 'The skull is the complex osseous framework residing at the anterior-superior terminus of the axial skeleton. Comprising 22 distinct bones (excluding the 6 auditory ossicles), the skull is anatomically categorized into the Neurocranium (8 cranial bones enclosing the brain cavity) and the Viscerocranium (14 facial bones constructing the facial features, orbits, nasal cavity, and oral cavity).',
          anatomyAndHistology: 'The 8 neurocranial bones (Frontal, Parietal [2], Temporal [2], Occipital, Sphenoid, and Ethmoid) are firmly joined in adults by fibrous, immovable synarthrodial joints termed sutures (Coronal, Sagittal, Lambdoid, and Squamosal sutures). Histologically, flat bones of the cranial vault exhibit a "sandwich" structure: an outer and inner table of dense compact bone flanking a central cancellous bone layer termed the diploë, housing red bone marrow.',
          physiologyAndMechanisms: 'The rigid adult neurocranium provides physical armor against traumatic impacts, maintaining constant intracranial volume. According to the Monro-Kellie Hypothesis, the total volume of brain tissue, blood, and cerebrospinal fluid (CSF) inside the rigid skull vault is fixed; an increase in one component must be compensated by a decrease in another to prevent dangerous spikes in Intracranial Pressure (ICP). In neonates, fibrous gaps called fontanelles allow cranial overlapping during vaginal childbirth and accommodate rapid brain enlargement.',
          clinicalSignificance: 'Basilar Skull Fractures occur through the delicate floor of the cranium, often presenting clinically with "Raccoon Eyes" (periorbital ecchymosis), "Battle\'s Sign" (postauricular ecchymosis), and CSF rhinorrhea or otorrhea. Craniosynostosis is premature congenital fusion of one or more cranial sutures, restricting brain growth and causing abnormal skull shape requiring surgical reconstruction.'
        }
      },
      {
        id: 'spine',
        name: 'Spine (Vertebral Column)',
        pronunciation: 'VUR-tuh-brul KOL-um',
        category: 'Axial Support Pillar',
        description: 'A flexible column of 33 stacked vertebrae cushioned by cartilage intervertebral discs.',
        functionSummary: 'Supports upright posture, absorbs impact shock, and shields the delicate Spinal Cord passing through its center canal.',
        analogy: 'A flexible armored conduit shielding high-voltage cable wires.',
        clinicalNote: 'Herniated ("slipped") discs occur when the soft inner gel of a disc leaks out, pressing against spinal nerves.',
        funFact: 'You are actually about 1 cm taller in the morning than at night because gravity compresses spinal discs during the day!',
        svgCoords: { x: 250, y: 200 },
        color: '#94A3B8',
        essay: {
          overview: 'The vertebral column (spine) is the central flexible skeletal axis of the human body, extending from the base of the skull down to the pelvis. Composed of 33 individual vertebrae stacked vertically—divided into 7 Cervical, 12 Thoracic, 5 Lumbar, 5 fused Sacral, and 4 fused Coccygeal segments—the spine provides upright structural support, enables multi-axial body motion, and houses the spinal cord within its protective neural canal.',
          anatomyAndHistology: 'A typical vertebra consists of a anterior load-bearing Vertebral Body and a posterior Neural Arch (pedicles and laminae) enclosing the Vertebral Foramen. Adjacent vertebrae are joined by Intervertebral Discs comprising a tough outer fibrous ring (Anulus Fibrosus) surrounding a highly hydrated gelatinous core (Nucleus Pulposus). The spine exhibits four natural physiological curves: lordotic in cervical and lumbar regions, and kyphotic in thoracic and sacral regions.',
          physiologyAndMechanisms: 'The vertebral column acts as a dynamic shock-absorption system. During axial weight-bearing (standing, jumping), hydrostatic pressure increases within the jelly-like Nucleus Pulposus of each intervertebral disc, causing it to bulge radially outward and distribute compression forces evenly across the fibrocartilaginous Anulus Fibrosus. The four alternating lordotic/kyphotic sagittal curves boost the spine\'s axial spring-like flexibility tenfold compared to a straight rod.',
          clinicalSignificance: 'Herniated Nucleus Pulposus ("slipped disc") occurs when tears in the outer Anulus Fibrosus allow inner Nucleus Pulposus gel to extrude posteriorly, compressing exiting spinal nerve roots and causing severe radicular pain (sciatica). Scoliosis is a lateral C- or S-shaped curvature of the spine exceeding 10 degrees in the frontal plane, most common in adolescent females.'
        }
      },
      {
        id: 'femur',
        name: 'Femur (Thigh Bone)',
        pronunciation: 'FEE-mur',
        category: 'Appendicular Power Lever',
        description: 'The longest, heaviest, and strongest bone in the human body.',
        functionSummary: 'Supports entire body weight during walking, running, and jumping.',
        analogy: 'A reinforced steel structural load-bearing pillar in a skyscraper.',
        clinicalNote: 'The femur is so strong it takes roughly 1,200 pounds of force to fracture it in a healthy adult!',
        funFact: 'Your femur is roughly 1/4th of your total height!',
        svgCoords: { x: 210, y: 340 },
        color: '#E2E8F0',
        essay: {
          overview: 'The femur (thigh bone) is the single bone of the thigh and the longest, heaviest, and strongest long bone in the human skeleton. Spanning from the hip joint superiorly to the knee joint inferiorly, the femur bears and transmits the entire upper body weight down to the lower leg during bipedal locomotion, standing, and jumping.',
          anatomyAndHistology: 'Anatomically, the proximal femur features a smooth spherical Head that articulates with the pelvic acetabulum, a constricted Neck, and two large muscle attachment prominences: the Greater and Lesser Trochanters. The long central Shaft (diaphysis) exhibits a slight anterior bowing and a prominent posterior ridge called the Linea Aspera. Histologically, the diaphysis consists of dense compact cortical bone surrounding a central medullary cavity filled with fatty yellow bone marrow.',
          physiologyAndMechanisms: 'Under the influence of mechanical load, the femur continuously remodels according to Wolff\'s Law (bone adapts to the loads under which it is placed). Weight-bearing forces create compressive stress on the medial femoral neck and tensile stress on the lateral femoral neck. Osteoblasts lay down new hydroxyapatite mineral matrix along lines of mechanical stress, while osteoclasts resorb unneeded bone.',
          clinicalSignificance: 'Femoral Neck Fractures ("hip fractures") are prevalent in elderly populations suffering from osteoporosis, often compromising the medial femoral circumflex artery and leading to Avascular Necrosis (AVN) of the femoral head. Femoral shaft fractures are high-energy traumatic injuries requiring emergent surgical stabilization via intramedullary nailing.'
        }
      },
      {
        id: 'biceps-triceps',
        name: 'Biceps & Triceps (Antagonistic Muscle Pair)',
        pronunciation: 'BY-seps & TRY-seps',
        category: 'Skeletal Muscular Actuators',
        description: 'Skeletal muscles attached to arm bones via tough collagen tendons.',
        functionSummary: 'Muscles can ONLY pull, never push! Biceps flexes the elbow joint, while Triceps extends it back out.',
        analogy: 'A pair of dual winch cables pulling a crane arm up and down.',
        clinicalNote: 'Tendonite is inflammation of the tendon anchoring muscle to bone due to repetitive stress.',
        funFact: 'Skeletal muscle tissue makes up roughly 40% of an average person’s total body mass!',
        svgCoords: { x: 170, y: 200 },
        color: '#F59E0B',
        essay: {
          overview: 'The Biceps Brachii and Triceps Brachii represent the classic antagonistic skeletal muscle pair controlling movement across the elbow (humeroulnar) joint. Because skeletal muscle fibers can actively contract (shorten) but cannot actively push, coordinated joint movements require pairs of opposing muscles: the agonist (prime mover) contracts while the antagonist relaxes.',
          anatomyAndHistology: 'The Biceps Brachii resides on the anterior compartment of the arm, arising via two heads (Short and Long Heads) from the scapula and inserting via the biceps tendon onto the radial tuberosity. The Triceps Brachii occupies the posterior compartment, arising via three heads (Long, Lateral, and Medial Heads) and inserting onto the olecranon process of the ulna. Histologically, both muscles comprise striated skeletal muscle fibers packed with parallel myofibrils composed of repeating actin and myosin sarcomere units.',
          physiologyAndMechanisms: 'Muscle contraction is explained by the Sliding Filament Theory. Action potentials arriving at the neuromuscular junction trigger acetylcholine release, depolarizing the sarcolemma and releasing calcium ions from the sarcoplasmic reticulum into the sarcoplasm. Calcium binds Troponin C, shifting Tropomyosin to expose myosin-binding sites on actin filaments. Myosin heads execute "power strokes," pulling actin inward to shorten the sarcomere. To flex the elbow, the Biceps contracts while the Triceps is inhibited via reciprocal inhibition pathways in the spinal cord.',
          clinicalSignificance: 'Biceps Tendon Rupture (often affecting the long head tendon at the bicipital groove) presents with a sudden painful "pop" followed by a visible bulge in the anterior arm termed the "Popeye muscle" deformity. Muscle strains involve microscopic tearing of sarcomeres and myotendinous junctions due to eccentric overload.'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-skel-1',
        question: 'What is the longest and strongest bone in the human body?',
        options: ['Humerus', 'Spine', 'Femur', 'Tibia'],
        correctAnswerIndex: 2,
        explanation: 'The Femur (thigh bone) is both the longest and strongest bone in the skeleton.',
        funFact: 'Concrete is strong, but healthy human bone tissue is 4 times stronger per ounce under compression!'
      }
    ]
  },

  digestive: {
    id: 'digestive',
    title: 'Digestive System',
    systemName: 'Gastrointestinal Tract & Nutrient Refinery',
    subtitle: 'The Fuel Converter & Absorptive Factory',
    accentColor: '#10B981', // Emerald
    bgGradient: 'from-emerald-500/10 via-green-500/5 to-transparent',
    description: 'A 30-foot continuous muscular tube that breaks down complex food into microscopic molecular nutrients, absorbs them into blood, and expels waste.',
    keyFunctions: [
      'Mechanical breakdown (mastication & stomach churning)',
      'Chemical breakdown via digestive enzymes & stomach Hydrochloric Acid (pH 1.5-2.0)',
      'Absorption of nutrients & water into capillaries in Small Intestine',
      'Metabolic filtering of blood by the Liver'
    ],
    labControls: {
      title: 'Nutrient Digestion Journey Lab',
      description: 'Follow a food particle from the Mouth down through Esophageal Peristalsis, Acid Churning in the Stomach, and Nutrient Absorption in the Intestines.'
    },
    parts: [
      {
        id: 'esophagus',
        name: 'Esophagus',
        pronunciation: 'ih-SOF-uh-gus',
        category: 'Muscular Transport Tube',
        description: 'A 10-inch muscular tube connecting the throat (pharynx) to the stomach.',
        functionSummary: 'Propels food down using rhythmic wave-like muscle contractions called Peristalsis.',
        analogy: 'Squeezing toothpaste down a tube from behind.',
        clinicalNote: 'Acid reflux (heartburn) happens when stomach acid leaks back up through the lower esophageal sphincter.',
        funFact: 'Thanks to peristalsis, you can swallow food and drink water even while standing upside down on your head!',
        svgCoords: { x: 250, y: 130 },
        color: '#34D399',
        essay: {
          overview: 'The esophagus is a straight, muscular conducting tube measuring approximately 25 cm in length and 2 cm in diameter, connecting the pharynx to the stomach. Extending through the neck, posterior mediastinum, and diaphragmatic esophageal hiatus (T10 level), its sole physiological function is to conduct ingested food boluses and liquids safely from the oral cavity to the gastric reservoir while preventing gas aerophagia and retrograde acid reflux.',
          anatomyAndHistology: 'Histologically, the esophagus is unique in its muscularis externa transition: the superior third consists entirely of skeletal muscle (under voluntary control during swallowing), the middle third contains a blend of skeletal and smooth muscle, and the inferior third consists exclusively of smooth muscle. Its lumen is lined by non-keratinized stratified squamous epithelium capable of withstanding mechanical abrasion from hard food particles.',
          physiologyAndMechanisms: 'Deglutition (swallowing) triggers primary esophageal peristalsis—a wave of muscular contraction originating in the upper esophagus that propagates inferiorly at 2-4 cm/s. Circular muscle fibers contract behind the bolus to squeeze it forward, while longitudinal muscle fibers contract ahead of the bolus to shorten the tube. Upon the bolus reaching the distal esophagus, the Lower Esophageal Sphincter (LES)—a ring of tonic smooth muscle—relaxes passively under vagal VIP/nitric oxide mediation to admit the bolus into the stomach.',
          clinicalSignificance: 'Gastroesophageal Reflux Disease (GERD) occurs when LES incompetence permits acidic gastric juice to reflux upward, damaging the esophageal mucosa and causing pyrosis ("heartburn"). Chronic acid exposure induces Barrett\'s Esophagus—a precancerous metaplasia where stratified squamous epithelium transforms into intestinal columnar epithelium. Esophageal Varices are dilated submucosal veins secondary to portal hypertension (often due to liver cirrhosis) prone to catastrophic rupture.'
        }
      },
      {
        id: 'stomach',
        name: 'Stomach',
        pronunciation: 'STUM-uk',
        category: 'Acidic Churning Chamber',
        description: 'A J-shaped expandable muscular pouch lined with protective mucus.',
        functionSummary: 'Secretes Hydrochloric Acid (pH 1.5) and Pepsin to dissolve proteins and churn food into a liquid paste called Chyme.',
        analogy: 'A powerful blender filled with industrial acid solution.',
        clinicalNote: 'Stomach ulcers occur when the protective mucus lining breaks down, allowing acid to burn tissue underneath.',
        funFact: 'Your stomach lining completely replaces itself every 3 to 4 days so it doesn’t digest itself with its own acid!',
        svgCoords: { x: 280, y: 210 },
        color: '#F87171',
        essay: {
          overview: 'The stomach is a high-capacity, J-shaped intraperitoneal muscular organ situated in the left upper quadrant of the abdomen between the esophagus and the duodenum. Acting as an expandable mechanical blender, chemical digestive vessel, and temporal reservoir, the stomach converts ingested solid food into a semi-liquid acidic paste called chyme while regulating its controlled emptying into the small intestine.',
          anatomyAndHistology: 'Anatomically divided into Cardia, Fundus, Body, and Pylorus, the gastric wall features an inner mucosa thrown into prominent longitudinal folds called rugae when relaxed. Unique among GI organs, its muscularis externa contains three smooth muscle layers (outer longitudinal, middle circular, inner oblique) enabling multidirectional churning. Its gastric mucosa is pitted with gastric glands containing three key functional cell types: (1) Parietal Cells (secreting Hydrochloric Acid, HCl, and Intrinsic Factor); (2) Chief Cells (secreting Pepsinogen); and (3) Mucous Neck Cells (secreting bicarbonate-rich protective mucus).',
          physiologyAndMechanisms: 'Parietal cell proton pumps (H+/K+ ATPase) actively secrete hydrogen ions against a million-fold concentration gradient, lowering gastric pH to 1.5 - 2.0. This intense acidity denatures tertiary protein structures, destroys ingested pathogens, and cleaves inactive pepsinogen into active pepsin (a proteolytic enzyme). Intrinsic Factor secreted by parietal cells binds dietary Vitamin B12, enabling its eventual absorption in the terminal ileum. Hydrochloric acid damage to the stomach itself is prevented by the Mucus-Bicarbonate Barrier.',
          clinicalSignificance: 'Peptic Ulcer Disease (PUD) is mucosal erosion extending through the muscularis mucosae, most commonly caused by Chronic Helicobacter pylori infection (which disrupts the mucosal barrier) or prolonged NSAID use (inhibiting protective prostaglandin synthesis). Pernicious Anemia is an autoimmune destruction of parietal cells leading to Intrinsic Factor deficiency and Vitamin B12 malabsorption.'
        }
      },
      {
        id: 'liver',
        name: 'Liver',
        pronunciation: 'LIV-er',
        category: 'Metabolic & Detox Powerhouse',
        description: 'The largest internal organ, weighing ~3 pounds on the right side of the abdomen.',
        functionSummary: 'Produces Bile to emulsify fats, neutralizes toxins/drugs, stores glucose as glycogen, and processes absorbed nutrients.',
        analogy: 'A high-tech chemical refinery, waste recycling center, and distribution hub.',
        clinicalNote: 'The liver is the only organ in the human body capable of regenerating lost tissue—as little as 25% of a liver can grow back into a full liver!',
        funFact: 'The liver performs over 500 vital metabolic chemical functions every single minute!',
        svgCoords: { x: 200, y: 200 },
        color: '#B45309',
        essay: {
          overview: 'The liver is the largest internal gland and metabolic factory in the human body, weighing roughly 1.5 kg in adults. Positioned in the right upper quadrant directly beneath the diaphragm, the liver receives dual blood supply (hepatic artery and portal vein) and performs over 500 vital biochemical functions—including lipid and carbohydrate metabolism, plasma protein synthesis, detoxification of endogenous metabolic waste and exogenous drugs, and exocrine bile secretion.',
          anatomyAndHistology: 'Microscopically, the liver is organized into hexagonal Structural Lobules centered on a Central Vein, flanked at the outer corners by Portal Triads (comprising branches of the Hepatic Artery, Hepatic Portal Vein, and Bile Duct). Plates of specialized epithelial cells (Hepatocytes) radiate from the central vein, bordered by fenestrated Liver Sinusoids lined with phagocytic resident macrophages called Kupffer Cells.',
          physiologyAndMechanisms: 'Nutrients absorbed across the intestinal mucosa enter the Hepatic Portal System, routing directly through liver sinusoids. Hepatocytes convert excess blood glucose into stored glycogen (glycogenesis) under insulin signaling, and break down glycogen (glycogenolysis) or synthesize glucose from amino acids (gluconeogenesis) under glucagon signaling. Hepatocytes continuously synthesize Bile Salts from cholesterol, secreting bile into canaliculi to emulsify dietary fats in the duodenum. Furthermore, hepatocytes express cytochrome P450 enzymes that chemically oxidize and conjugate xenobiotics and drugs for renal or biliary excretion.',
          clinicalSignificance: 'Cirrhosis is irreversible end-stage liver fibrosis where necrotic hepatocytes are replaced by regenerative nodules surrounded by fibrous scar tissue, leading to Portal Hypertension, Ascites, Esophageal Varices, and Hepatic Encephalopathy (due to elevated blood ammonia). Jaundice (icterus) occurs when hyperbilirubinemia impairs skin and scleral pigmentation due to biliary obstruction, hemolysis, or hepatocellular failure.'
        }
      },
      {
        id: 'small-intestine',
        name: 'Small Intestine (Duodenum, Jejunum, Ileum)',
        pronunciation: 'SMALL in-TES-tin',
        category: 'Primary Absorptive Workhorse',
        description: 'A 20-foot long folded tube lined with millions of microscopic finger-like projections called Villi.',
        functionSummary: 'Completes chemical digestion using pancreatic enzymes & bile, absorbing 90% of all food nutrients into blood.',
        analogy: 'A 20-foot sponge lining designed to maximize surface contact.',
        clinicalNote: 'Celiac disease is an autoimmune condition where gluten triggers immune attacks that destroy intestinal villi.',
        funFact: 'If unfolded and flattened out, the microscopic villi of your small intestine would cover an area as big as a tennis court!',
        svgCoords: { x: 250, y: 280 },
        color: '#FBBF24',
        essay: {
          overview: 'The small intestine is a long, highly convoluted muscular tube measuring approximately 6 meters (20 feet) in length, extending from the pyloric sphincter of the stomach to the ileocecal valve of the large intestine. Divided into three sequential segments—the Duodenum (25 cm), Jejunum (2.5 m), and Ileum (3.5 m)—the small intestine is the principal organ responsible for finalizing chemical digestion and absorbing over 90% of all dietary water, electrolytes, and organic nutrients into systemic circulation.',
          anatomyAndHistology: 'To maximize absorptive surface area (~250 square meters), the small intestinal mucosa exhibits three progressive levels of structural amplification: (1) Plicae Circulares (permanent circular mucosal folds); (2) Villi (1 mm finger-like mucosal projections containing capillary loops and a central lymphatic lacteal); and (3) Microvilli (forming the microscopic "Brush Border" on enterocyte apical membranes). Enterocytes express brush border enzymes (lactase, sucrase, maltase, peptidases).',
          physiologyAndMechanisms: 'Acidic chyme entering the C-shaped Duodenum triggers enteroendocrine release of Secretin (stimulating pancreatic bicarbonate secretion to neutralize acid to pH ~7) and Cholecystokinin (CCK, stimulating gallbladder contraction to eject bile and pancreatic digestive zymogens: trypsinogen, lipase, amylase). Monosaccharides and amino acids are absorbed across enterocytes via sodium-dependent secondary active transporters (e.g. SGLT1) into capillary blood, while digested fatty acids are re-esterified into triglycerides, packaged into Chylomicrons, and absorbed into lymphatic lacteals.',
          clinicalSignificance: 'Celiac Disease is an autoimmune enteropathy where ingestion of dietary gluten triggers T-cell-mediated destruction of small intestinal villi (villous atrophy), causing severe nutrient malabsorption, chronic diarrhea, and weight loss. Short Bowel Syndrome occurs following extensive surgical resection of the small intestine, requiring long-term total parenteral nutrition (TPN).'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-dig-1',
        question: 'What is the wave-like muscular contraction that pushes food through the esophagus and digestive tract called?',
        options: ['Accommodation', 'Peristalsis', 'Respiration', 'Emulsification'],
        correctAnswerIndex: 1,
        explanation: 'Peristalsis is the coordinated, rhythmic contraction of smooth muscle layers lining the GI tract.',
        funFact: 'Peristalsis is so effective that astronaut food moves through the digestive system effortlessly in microgravity!'
      }
    ]
  },
  ear: {
    id: 'ear',
    title: 'The Human Ear & Hearing',
    systemName: 'Auditory & Vestibular System',
    subtitle: 'Transducer of Acoustic Waves & Guardian of Balance',
    accentColor: '#FB7185', // Rose pink
    bgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    description: 'The human ear captures acoustic sound waves in the environment, converts them into physical mechanical vibrations via tiny ossicle bones, and translates fluid waves into nerve signals for pitch and balance.',
    keyFunctions: [
      'Gathers acoustic sound waves via the Pinna and Ear Canal',
      'Converts air vibrations to mechanical motion via Eardrum & Ossicles',
      'Transduces fluid movement into electrical impulses in Cochlea hair cells',
      'Senses spatial rotation and gravity via Semicircular Canals & Otoliths'
    ],
    labControls: {
      title: 'Acoustic Frequency & Equilibrating Balance Lab',
      description: 'Adjust sound wave frequency (Hz) and decibel volume (dB) to observe eardrum vibration and cochlear hair cell bending, or trigger head rotation to simulate vestibular fluid motion.'
    },
    parts: [
      {
        id: 'pinna',
        name: 'Pinna (Auricle)',
        pronunciation: 'PIN-uh',
        category: 'Outer Ear Funnel',
        description: 'The visible elastic cartilage structure on the side of the head that funnels sound waves into the ear canal.',
        functionSummary: 'Collects ambient sound waves and directs them into the ear canal while helping localize sound sources in 3D space.',
        analogy: 'A satellite dish funneling incoming signals directly into a central receiver.',
        clinicalNote: 'Cauliflower ear occurs when repeated blunt trauma detaches cartilage from its perichondrial blood supply.',
        funFact: 'The unique swirls and ridges of your ear cartilage (helix, antihelix, concha) are as distinct to you as fingerprints!',
        svgCoords: { x: 80, y: 200 },
        color: '#EA580C',
        essay: {
          overview: 'The pinna, or auricle, is the prominent cartilaginous external structure of the auditory system projecting laterally from both sides of the human head. Functioning as an acoustic collector and spatial funnel, the pinna gathers ambient sound waves from the environment and directs them into the external auditory meatus. Crucially, the complex folds and asymmetric topography of the pinna modify incoming sound spectra, providing essential spectral cues utilized by the central nervous system for vertical sound localization.',
          anatomyAndHistology: 'Anatomically, the pinna consists of a single continuous plate of flexible elastic cartilage wrapped in tightly adhering perichondrium and thin, keratinized stratified squamous skin containing sebaceous and sweat glands. Anatomical landmarks include the outermost curved rim (helix), the parallel inner ridge (antihelix), the deep central bowl (concha), the anterior cartilaginous flap protecting the canal opening (tragus), the opposing antitragus, and the inferior non-cartilaginous, highly vascularized skin lobe (lobule).',
          physiologyAndMechanisms: 'Sound waves striking the pinna undergo diffraction and reflection off its intricate anatomical grooves. Because higher-frequency sound waves (>4,000 Hz) have wavelengths comparable to the dimensions of the concha and helix folds, interference patterns alter the frequency spectrum dependent on the elevation angle of the sound source. The brain compares these subtle frequency notches to pinpoint whether a sound originated above, below, behind, or in front of the listener.',
          clinicalSignificance: 'Auricular Hematoma ("cauliflower ear") arises from blunt trauma that shears the perichondrium from underlying avascular cartilage. Blood pooling in the subperichondrial space disrupts nutrient diffusion, causing cartilage necrosis and fibrous scarring. Microtia is a congenital deformity where the external ear is underdeveloped or absent, often associated with conductive hearing loss due to external auditory canal atresia.'
        }
      },
      {
        id: 'ear-canal',
        name: 'Ear Canal (Auditory Meatus)',
        pronunciation: 'AW-di-tor-ee mee-AY-tus',
        category: 'Outer Ear Conduction Tube',
        description: 'A 2.5 cm curved s-shaped tube extending from the pinna to the tympanic membrane.',
        functionSummary: 'Directs sound waves inward while producing cerumen (earwax) and hair cells to trap dust, insects, and pathogens.',
        analogy: 'A protective tube amplifier that naturally boosts acoustic frequencies around 2,000 to 5,000 Hz.',
        clinicalNote: 'Otitis externa (swimmer’s ear) is a painful bacterial infection of the ear canal skin caused by trapped moisture.',
        funFact: 'Cerumen (earwax) is naturally self-cleaning, water-repellent, and antibacterial!',
        svgCoords: { x: 180, y: 215 },
        color: '#D97706',
        essay: {
          overview: 'The external auditory canal, or external acoustic meatus, is an S-shaped conducting tube approximately 2.5 centimeters (1 inch) in length extending from the concha of the pinna to the tympanic membrane. Serving as the physical portal between the outer environment and the middle ear cavity, the ear canal protects delicate deeper structures while acting as an acoustic quarter-wavelength resonator that passively amplifies sound frequencies critical for human speech perception.',
          anatomyAndHistology: 'The outer one-third of the ear canal is cartilaginous and continuous with the pinna, lined by skin containing hair follicles, sebaceous glands, and specialized apocrine sweat glands called ceruminous glands. The inner two-thirds traverses the temporal bone and is lined by thin, exquisite skin lacking subcutaneous fat. Ceruminous glands secrete a lipid-rich fluid that mixes with sebum and exfoliated keratinocytes to form cerumen (earwax). Epithelial migration naturally moves cerumen laterally outward from the eardrum toward the entrance.',
          physiologyAndMechanisms: 'Acoustically, the ear canal functions as a cylinder closed at one end (by the eardrum). This geometry generates acoustic resonance in the frequency band of 2,000 Hz to 5,000 Hz, boosting sound pressure levels reaching the eardrum by 10 to 15 decibels. This frequency boost directly aligns with the fundamental frequencies of human consonant speech (such as "f", "s", and "th" sounds). Chemically, cerumen maintains an acidic pH (~6.0) that inhibits bacterial and fungal colonization.',
          clinicalSignificance: 'Cerumen Impaction occurs when cotton swabs push earwax deep into the bony canal, causing conductive hearing loss, tinnitus, and ear fullness. Otitis Externa ("swimmer’s ear") is inflammation or infection of the canal lining (most commonly by Pseudomonas aeruginosa) secondary to moisture accumulation or mechanical micro-abrasions.'
        }
      },
      {
        id: 'eardrum',
        name: 'Tympanic Membrane (Eardrum)',
        pronunciation: 'tim-PAN-ik MEM-brane',
        category: 'Acoustic-Mechanical Transducer',
        description: 'A thin, translucent, cone-shaped fibrous membrane separating the outer ear from the middle ear cavity.',
        functionSummary: 'Vibrates rapidly when struck by acoustic sound waves, transmitting kinetic mechanical energy to the auditory ossicles.',
        analogy: 'The flexible membrane skin stretched tight across a drumhead.',
        clinicalNote: 'Perforated eardrums can result from loud acoustic blasts, sudden pressure changes (barotrauma), or middle ear infections.',
        funFact: 'The eardrum is only 0.1 millimeters thick—thinner than a single sheet of paper!',
        svgCoords: { x: 255, y: 222 },
        color: '#0284C7',
        essay: {
          overview: 'The tympanic membrane, commonly known as the eardrum, is a semi-transparent, pearl-gray, oval-shaped fibrous membrane measuring roughly 8 to 10 millimeters in diameter and only 0.1 millimeters in thickness. Set obliquely at the termination of the external auditory canal, it forms the physical boundary separating the external ear from the air-filled tympanic cavity of the middle ear. The eardrum functions as an acoustic transducer, converting airborne sound pressure waves into mechanical kinetic vibrations.',
          anatomyAndHistology: 'Histologically, the tympanic membrane comprises three distinct tissue layers: (1) An outer epidermal layer continuous with ear canal skin; (2) A middle fibrous lamina propria containing dense radial and circular collagen fibers providing mechanical elasticity; and (3) An inner mucosal layer continuous with middle ear lining. The membrane is divided into the large, tense lower region (pars tensa) held taut by a fibrocartilaginous ring (annulus), and a small superior flaccid region (pars flaccida). The manubrium (handle) of the malleus is embedded within the center of the membrane at the umbo.',
          physiologyAndMechanisms: 'When sound waves impinge upon the outer surface of the eardrum, alternating high and low pressure regions push and pull the membrane. The pars tensa vibrates sympathetically with sound frequencies up to 20,000 Hz. Because the surface area of the tympanic membrane (~55 sq mm) is approximately 17 times larger than the footplate of the stapes (~3.2 sq mm), the eardrum concentrates mechanical force onto a much smaller target, achieving significant acoustic impedance matching between air and cochlear fluid.',
          clinicalSignificance: 'Otitis Media is acute infection of the middle ear space causing purulent fluid accumulation, bulging of the tympanic membrane, severe otalgia, and conductive hearing loss. Tympanic Membrane Perforation can occur from acoustic trauma, barotrauma, or direct penetration; small tears heal spontaneously, while chronic defects require surgical myringoplasty.'
        }
      },
      {
        id: 'ossicles',
        name: 'Auditory Ossicles (Malleus, Incus, Stapes)',
        pronunciation: 'MAL-ee-us, ING-kus, STAY-peez',
        category: 'Middle Ear Mechanical Amplifiers',
        description: 'The three smallest bones in the human body, linked together by delicate synovial joints inside the middle ear.',
        functionSummary: 'Amplify mechanical sound vibrations ~20-fold and transmit them from the large eardrum to the tiny oval window.',
        analogy: 'A precision lever system or hydraulic piston that amplifies delicate forces.',
        clinicalNote: 'Otosclerosis causes abnormal bone growth around the stapes footplate, fixing it in place and causing progressive conductive hearing loss.',
        funFact: 'All three ossicles combined can fit comfortably on top of a single fingernail!',
        svgCoords: { x: 290, y: 185 },
        color: '#B45309',
        essay: {
          overview: 'The auditory ossicles are a chain of three miniature bones—the Malleus (hammer), Incus (anvil), and Stapes (stirrup)—suspended within the air-filled middle ear cavity. Representing the three smallest bones in the human skeleton, the ossicles form an articulated mechanical linkage that transfers acoustic vibrations from the tympanic membrane across the middle ear space to the fluid-filled cochlea of the inner ear while overcoming the acoustic impedance barrier between air and fluid.',
          anatomyAndHistology: 'The Malleus attaches via its manubrium (handle) to the tympanic membrane, articulating with the Incus at the incudomalleolar joint. The Incus projects a long process that articulates with the Stapes at the incudostapedial joint. The Stapes consists of a head, arching anterior and posterior crura, and a flat oval Footplate seated inside the oval window of the cochlea. Two tiny skeletal muscles—the Tensor Tympani (innervated by CN V3) and Stapedius (innervated by CN VII)—attach to the malleus and stapes respectively.',
          physiologyAndMechanisms: 'Air has low acoustic impedance, whereas cochlear perilymph fluid has high acoustic impedance. Direct transfer of sound waves from air to fluid would reflect 99.9% of acoustic energy. The ossicular chain overcomes this via two mechanical advantages: (1) Hydraulic Ratio: The large surface area of the eardrum focusing force onto the tiny stapes footplate amplifies pressure by ~17:1; (2) Lever Advantage: The malleus handle is longer than the incus long process, providing an additional 1.3:1 mechanical leverage. Combined, they amplify sound pressure by ~22-fold. Extremely loud sounds (>80 dB) trigger the Acoustic Reflex, causing tensor tympani and stapedius muscles to contract, stiffening the ossicles to protect the inner ear.',
          clinicalSignificance: 'Otosclerosis is an autosomal dominant bone remodeling disorder where abnormal spongy bone immobilizes the stapes footplate, leading to progressive conductive hearing loss. Treatment includes stapedectomy (replacing the stapes with a micro-prosthesis). Ossicular Chain Disruption occurs during severe head trauma, dislocating the incudostapedial joint.'
        }
      },
      {
        id: 'eustachian-tube',
        name: 'Eustachian Tube (Auditory Tube)',
        pronunciation: 'yoo-STAY-shee-un TUBE',
        category: 'Middle Ear Pressure Regulator',
        description: 'A canal connecting the middle ear cavity to the nasopharynx at the back of the nose and throat.',
        functionSummary: 'Equalizes air pressure on both sides of the eardrum and drains mucus away from the middle ear cavity.',
        analogy: 'A pressure-relief valve on a pressure cooker or submarines airlock.',
        clinicalNote: 'When your ears "pop" on an airplane or mountain drive, the Eustachian tube opens to equalize air pressure.',
        funFact: 'Swallowing and yawning contract muscles that actively pull open the Eustachian tube!',
        svgCoords: { x: 330, y: 300 },
        color: '#B91C1C',
        essay: {
          overview: 'The Eustachian tube, or pharyngotympanic tube, is a narrow channel approximately 3.5 centimeters in length connecting the anterior wall of the middle ear cavity directly to the lateral wall of the nasopharynx. Acting as a biological pressure-equalization valve and ventilation duct, the Eustachian tube maintains equal atmospheric pressure across the tympanic membrane, allowing it to vibrate freely without mechanical strain.',
          anatomyAndHistology: 'The upper one-third of the tube closest to the middle ear is osseous (bony), while the lower two-thirds extending toward the throat is flexible cartilage. Lined by pseudostratified ciliated columnar epithelium with goblet cells, cilia beat downward toward the nasopharynx to continuously sweep mucosal secretions out of the middle ear. Under resting conditions, the cartilaginous lumen remains closed. It is opened actively by contraction of the Tensor Veli Palatini and Levator Veli Palatini muscles during deglutition (swallowing), yawning, or chewing.',
          physiologyAndMechanisms: 'Middle ear tissue continuously absorbs gas (oxygen and nitrogen) into mucosal capillary blood, creating a ambient negative relative pressure. Periodic opening of the Eustachian tube allows ambient air to enter, restoring equal pressure between the ear canal and middle ear cavity. Equalized pressure prevents the eardrum from retracting inward or bulging outward, preserving optimal acoustic transfer efficiency.',
          clinicalSignificance: 'Eustachian Tube Dysfunction (ETD) occurs when inflammation (from upper respiratory infections or allergies) prevents the tube from opening. Trapped negative pressure causes eardrum retraction, fluid buildup (serous otitis media), and muffled hearing. Young children have shorter, wider, and more horizontal Eustachian tubes, predisposing them to frequent middle ear infections (Otitis Media).'
        }
      },
      {
        id: 'cochlea',
        name: 'Cochlea (Organ of Corti)',
        pronunciation: 'KOK-lee-uh',
        category: 'Inner Ear Neural Transducer',
        description: 'A snail-shell-shaped fluid-filled bony spiral containing thousands of microscopic sensory hair cells.',
        functionSummary: 'Converts fluid pressure waves into electrical nerve impulses sorted by frequency (tonotopic map).',
        analogy: 'A biological piano keyboard where different keys respond to low bass or high treble pitch.',
        clinicalNote: 'Sensorineural hearing loss occurs when cochlear hair cells are damaged by loud noises or aging; cochlear implants can restore hearing.',
        funFact: 'High frequencies (20,000 Hz) are detected at the base of the cochlea, while low bass frequencies (20 Hz) travel to the apex tip!',
        svgCoords: { x: 440, y: 260 },
        color: '#D97706',
        essay: {
          overview: 'The cochlea is a coiled, snail-shell-shaped bony cavity of the inner ear making 2.75 turns around a central bony pillar (the modiolus). Functioning as the primary sensory receptor organ for hearing, the cochlea converts mechanical fluid pressure waves generated by the stapes footplate into high-speed electrical nerve action potentials, organizing sound frequencies according to a precise spatial map (tonotopy).',
          anatomyAndHistology: 'Internally, the cochlear canal is partitioned into three parallel fluid-filled ducts: (1) Scala Vestibuli (top chamber filled with sodium-rich perilymph); (2) Scala Tympani (bottom chamber filled with perilymph); and (3) Scala Media (middle cochlear duct filled with potassium-rich endolymph, +80 mV potential). Lying on the basilar membrane within the scala media sits the Organ of Corti—the sensory apparatus containing one row of Inner Hair Cells (~3,500 cells, primary auditory receptors) and three rows of Outer Hair Cells (~12,000 cells, mechanical amplifiers). Microscopic stereocilia project from the tops of hair cells, embedded in the gelatinous Tectorial Membrane.',
          physiologyAndMechanisms: 'Piston movements of the stapes footplate at the oval window create fluid pressure waves in perilymph that ripple down the basilar membrane. High-frequency sounds (high pitch, up to 20,000 Hz) peak at the narrow, stiff base of the cochlea near the oval window. Low-frequency sounds (low bass, down to 20 Hz) travel all the way to the wide, flexible apex (helicotrema). As the basilar membrane vibrates upward, hair cell stereocilia bend against the tectorial membrane. Mechanical tension opens K+ ion channels at stereocilia tip-links, driving influx of potassium from endolymph, depolarizing the hair cell, opening voltage-gated calcium channels, releasing glutamate neurotransmitter, and firing action potentials along CN VIII.',
          clinicalSignificance: 'Presbycusis is age-related sensorineural hearing loss resulting from progressive irreversible loss of cochlear hair cells, typically affecting high frequencies first. Noise-Induced Hearing Loss (NIHL) occurs when acoustic trauma (>85 dB) shears stereocilia. Cochlear Implants bypass damaged hair cells, using an external microphone and internal electrode array inserted into the scala tympani to stimulate CN VIII fibers directly.'
        }
      },
      {
        id: 'semicircular-canals',
        name: 'Semicircular Canals (Vestibular System)',
        pronunciation: 'sem-ee-SUR-kyoo-lar ka-NALS',
        category: 'Inner Ear Balance & Equilibrium Sensor',
        description: 'Three fluid-filled ring structures oriented in three orthogonal spatial planes (x, y, z axes) connected to the vestibule.',
        functionSummary: 'Detects rotational head movement, head tilting, and acceleration to maintain dynamic balance and gaze stability.',
        analogy: 'A 3D gyroscope and accelerometer system inside a smartphone or aircraft navigation computer.',
        clinicalNote: 'Benign Paroxysmal Positional Vertigo (BPPV) happens when tiny calcium carbonate crystals (otoconia) dislodge into the canals.',
        funFact: 'Spinning in circles makes endolymph fluid keep moving even after you stop, making your eyes twitch (nystagmus) and causing dizziness!',
        svgCoords: { x: 410, y: 145 },
        color: '#B45309',
        essay: {
          overview: 'The semicircular canals are three interconnected fluid-filled osseous loops situated in the posterior inner ear, oriented at right angles to one another corresponding to the three dimensions of space (pitch, roll, and yaw). Forming the vestibular apparatus alongside the otolith organs (utricle and saccule), the semicircular canals sense angular rotational acceleration of the head, supplying essential sensory data to the brainstem, cerebellum, and ocular muscles to maintain physical equilibrium and gaze stability during movement.',
          anatomyAndHistology: 'The three canals—Anterior (Superior), Posterior, and Lateral (Horizontal)—are filled with endolymph fluid and housed within the temporal bone. Each canal features a swollen bulbous base called an Ampulla. Inside the ampulla sits a sensory crest (crista ampullaris) containing vestibular hair cells embedded in a gelatinous, sail-like dome called the Cupula spanning the lumen of the ampulla.',
          physiologyAndMechanisms: 'When the head rotates in any spatial plane, inertia causes the endolymph fluid within the corresponding canal to lag behind, pushing against the flexible cupula. Bending of the cupula deflects hair cell stereocilia toward or away from the taller kinocilium. Deflection toward the kinocilium opens ion channels, increasing CN VIII firing rate; deflection away hyperpolarizes the cell, reducing firing rate. This push-pull bilateral signal feeds the Vestibulo-Ocular Reflex (VOR), which reflexively rotates the eyes in the exact opposite direction of head movement to keep visual images locked onto the retina during walking or head motion.',
          clinicalSignificance: 'Benign Paroxysmal Positional Vertigo (BPPV) occurs when heavy microscopic calcium carbonate otoconia crystals dislodge from the utricle and float into a semicircular canal (most commonly posterior). Head movement causes crystals to drag endolymph, deflecting the cupula and triggering sudden severe vertigo; it is treated with canalith repositioning maneuvers (Epley Maneuver). Meniere’s Disease is an endolymphatic hydrops condition causing vertigo, fluctuating hearing loss, and tinnitus.'
        }
      },
      {
        id: 'auditory-nerve',
        name: 'Vestibulocochlear Nerve (Cranial Nerve VIII)',
        pronunciation: 'ves-tib-yoo-loh-KOK-lee-ar',
        category: 'Cranial Nerve Highway',
        description: 'A bundle of sensory nerve fibers carrying auditory and balance signals directly from the inner ear to the brainstem.',
        functionSummary: 'Transmits sound signals to the temporal lobe for hearing and balance signals to the cerebellum for body posture.',
        analogy: 'A high-speed fiber-optic cable connecting sensors to a central supercomputer.',
        clinicalNote: 'An acoustic neuroma (vestibular schwannoma) is a benign tumor growing on CN VIII that causes progressive hearing loss and tinnitus.',
        funFact: 'Signals travel along the vestibulocochlear nerve to the brain at speeds over 260 mph (120 meters per second)!',
        svgCoords: { x: 500, y: 200 },
        color: '#CA8A04',
        essay: {
          overview: 'The vestibulocochlear nerve, designated as Cranial Nerve VIII (CN VIII), is a purely sensory nerve bundle consisting of two distinct anatomical and functional divisions: the Cochlear Nerve (transmitting sound information from the cochlea) and the Vestibular Nerve (transmitting spatial orientation and balance information from the semicircular canals, utricle, and saccule). Traversing the internal acoustic meatus of the temporal bone, CN VIII enters the brainstem at the cerebellopontine angle.',
          anatomyAndHistology: 'The Cochlear Nerve originates from bipolar neurons housed in the Spiral Ganglion inside the modiolus of the cochlea, whose peripheral processes innervate inner hair cells. The Vestibular Nerve originates from bipolar neurons housed in Scarpa’s Ganglion, innervating hair cells in the ampullae and maculae. The two nerves join together inside the internal auditory canal alongside Cranial Nerve VII (Facial Nerve) and the labyrinthine artery.',
          physiologyAndMechanisms: 'Depolarization of inner hair cells releases glutamate, triggering action potentials along spiral ganglion axons. Auditory action potentials travel via CN VIII to the Cochlear Nuclei in the medulla, ascending through the Superior Olivary Complex (where interaural time and intensity differences calculate sound localization in horizontal space), Inferior Colliculus, and Medial Geniculate Nucleus (MGN) of the thalamus before reaching the Primary Auditory Cortex (A1, Brodmann areas 41 & 42) in the superior temporal gyrus.',
          clinicalSignificance: 'Acoustic Neuroma (Vestibular Schwannoma) is a slow-growing benign tumor arising from Schwann cells of the vestibular nerve inside the internal acoustic meatus. Early symptoms include unilateral sensorineural hearing loss, continuous high-pitched tinnitus, and mild unsteadiness; large tumors can compress adjacent Cranial Nerve VII (causing facial paralysis) or Cranial Nerve V (causing facial numbness).'
        }
      }
    ],
    defaultQuiz: [
      {
        id: 'q-ear-1',
        question: 'What is the main function of the three tiny ossicle bones (Malleus, Incus, Stapes) in the middle ear?',
        options: [
          'To generate cerumen (earwax)',
          'To amplify mechanical sound vibrations ~20-fold from the eardrum to the oval window',
          'To detect rotational head movements for balance',
          'To equalize air pressure between the middle ear and the throat'
        ],
        correctAnswerIndex: 1,
        explanation: 'The three ossicles form a mechanical leverage system that amplifies acoustic force onto the tiny oval window, overcoming the impedance barrier between air and cochlear fluid.',
        funFact: 'The stapes (stirrup) is the smallest bone in the human body, measuring only about 3 millimeters long!'
      },
      {
        id: 'q-ear-2',
        question: 'Which inner ear structure contains thousands of microscopic hair cells that convert fluid waves into electrical nerve impulses?',
        options: ['Tympanic Membrane', 'Pinna', 'Cochlea (Organ of Corti)', 'Eustachian Tube'],
        correctAnswerIndex: 2,
        explanation: 'The snail-shaped Cochlea houses the Organ of Corti, where fluid pressure waves flex hair cell cilia to fire nerve impulses along Cranial Nerve VIII.',
        funFact: 'High-pitched sounds peak near the base of the cochlea, while low bass sounds travel all the way to the apex tip!'
      },
      {
        id: 'q-ear-3',
        question: 'What structure connects the middle ear cavity to the back of the nose and throat to equalize air pressure?',
        options: ['Auditory Canal', 'Eustachian Tube', 'Semicircular Canal', 'Cochlear Duct'],
        correctAnswerIndex: 1,
        explanation: 'The Eustachian tube opens when you swallow or yawn to equalize air pressure on both sides of the eardrum.',
        funFact: 'Airplane cabin pressure drops during takeoff make your ears feel clogged until the Eustachian tube pops open!'
      },
      {
        id: 'q-ear-4',
        question: 'Which fluid-filled structures in the inner ear sense rotational head movements and spatial orientation for balance?',
        options: ['Semicircular Canals', 'Auditory Ossicles', 'Ceruminous Glands', 'External Meatus'],
        correctAnswerIndex: 0,
        explanation: 'The three Semicircular Canals are oriented in 3D orthogonal spatial planes (x, y, z) to detect head rotation and balance.',
        funFact: 'Spinning around in circles makes endolymph fluid keep sloshing in the canals even after you stop, causing dizziness!'
      }
    ]
  }
};

