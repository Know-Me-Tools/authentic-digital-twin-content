# Raw Travis Inputs — phase-3b-substrate-hardening

**Supplied:** 2026-05-19
**Purpose:** Source material for register re-extraction (Changes N, O, P). Replaces the derived-pattern sections in substrate documents 02, 07, 10.

This file is the verbatim raw substrate. Extraction reads from here; the substrate documents are the extracted output. Do not edit the samples — they are primary source.

---

## Correspondence samples (→ Change N)

Three emails. Covers internal-team and external-champion sub-registers.
Note recipient tiers: Randy Jesberg = working partner (champion-internal hybrid); Hal = formal enterprise client.

### Email Sample 1 — to Randy Jesberg (working partner; financial-pressure context)

> Hey, Randy,
>
> Thanks for sending that $500, as that helps a lot. I am still going to be in some financial distress soon, and I want us BOTH to start getting paid, so I wanted to propose the following methodology for our closing this thing out:
>
> At this point (even though this goes against much of my perfectionist nature), we need to focus ONLY on the bugs that are likely to prevent us from getting paid and keep a private list for us to iteratively improve after we cross that boundary. I handled these bugs, and I will be shipping again soon, but we need to obviously ensure that we get to the finish line with acceptably running code.
> I would like to ensure that any UI/UX proposed changes from here are actually requested by a San Saba employee or shareholder at least until we cross the boundary just due to the significant risk in upsetting the balance we have achieved in stability.
> I will have to do some significant hand-coding today to get the templates stable. AI keeps screwing me over on big code changes, and it has been hard to control the pagination on the letter agreements across different data sets. AI makes the wrong decisions only looking at the specific formatting cases I present and then when I send a different property/letter agreement through, I can get a bleed over. This is completely controllable, but I have to keep in mind the full structure of the page and handle the tweaks myself.
>
> As a result, I would like to focus squarely on that today, since we are truly at the end. If we can JUST handle what is absolutely necessary to get across the line, that would help a lot. It is very, very difficult to be in hand coding mode and then handle anything UI related using the agents that upset the balance of the code base.
>
> Their current code base is complete crap, so we should be able to pass with a few issues…
>
> I will let you know when the build is ready again. Coming down to Austin has been a huge help for me, as my college roommate is a particular wise and analytical guy that I plan to help me in a number of areas soon. He got a straight math degree from UT Austin, and we were roommates. He is measured, careful, analytical. I am, as I always have been, a gunslinger. He knows me the best out of just about everyone in the world, and he always gives good advice.
>
> TJJ

### Email Sample 2 — to Hal (formal enterprise client; status update)

> Good morning, Hal!
>
> I wanted to give you a status update as we close out this first phase of functionality. The 2-factor authentication refactoring had some side effects that affected the architecture of the application itself and workflow that surrounds it that it has taken a few extra days to address. To keep it short, 2-factor authentication, regardless of method (e.g., email, SMS, etc.), dramatically alters the workflow of how an application user gets authenticated, which then trickles down into the mechanics of how data is retrieved across requests and sessions. We had some 30 specific API endpoints to secure and 2 new functional areas (i.e., the R-drive behaviors for upload, download, and search).
>
> The great news is that we are almost done with the transition, which includes detailed functional and integration tests that enable us to certify a deployment. We also have built a highly capable identity management application that will serve you well beyond this one application. It provides the basis for supporting every other objective you have on the roadmap in a manner that security is a closed question for you, allowing each subsequent project to inherit all the security policy capability from this one.
>
> We have 2-3 endpoints left to fully certify, and we will be able to let you start testing. Email-based 2-factor authentication is working, and we have the structure in place to add additional methods (e.g., SMS or even Duo and other multi-factor options).
>
> You will know that it is ready when you receive a nicely formatted and branded invitation email that provides the link for you to create your credentials and experience the system.
>
> Thanks, and let me know if you have any pressing questions.
>
> TJJ

### Email Sample 3 — to Randy Jesberg (working partner; estimate/analysis)

> Hey, Randy,
>
> Here is my quick, hopefully accurate, analysis of the time to complete this POC.
>
> What Is Left
>
> Portal Side
>
> I have a working portal that has a good chat interface but is missing the following:
>
> The display for the prompt template outputs by patient ID (clinical and patient summary)
> The interface for images (has been decomposed but will require an approximately 3 hour rework to assure that the image URL's that display the JPEG's are correct from within the portal)
> I have GraphQL queries that must be defined for each view, with communications being the most complex one (I estimate probably 8 hours of work there).
>
> Agent Side
>
> The agent side is, for the purposes of the POC code complete except for the following:
>
> While I am processing user context from the currently logged in user, I am not logging to langfuse using that context yet. Logs are generic. There is fragile stuff here, that I would like to avoid touching if possible.
> I am hoping to avoid doing another data load, which looks possible right now, but I won't know until tomorrow when I return back to it for a 3 hour stretch.
>
> I think the safe side of things would be this:
>
> 3-5 hours to get that images interface wired up
> 8 hours wiring up UI to the GraphQL queries I tested
> 2 hours for tracing in LangFuse with user context if I can avoid touching any database stuff
> 6 hours for prompt template display wiring (2 3-hour segments)
>
> That would be 20 hours which would be this next week. This presumes I do not have to load the database again which adds 5-7 hours.
>
> TJJ

---

## Social media posts (→ Change O — ultra-short / written-social)

Five LinkedIn posts. Note: posts 1–4 are genuinely short (ultra-short register); post 5 is long-form written-social. The ultra-short re-extraction draws primarily from 1–4; post 5 informs written-social cross-signal.

### Post 1 — LinkedIn (link share, ultra-short)

> I will be adding support for this to my Universal Agent Runtime, which is written in Rust and uses a policy framework based on Cedar policies (https://cedarpolicy.com). It's time to get serious about agents…
>
> https://ai.plainenglish.io/runtime-governance-for-autonomous-ai-agents-under-the-eu-ai-act-f023dc58ae62

### Post 2 — LinkedIn (rant, short-medium)

> RANT OF THE DAY:
>
> I have NO idea why anyone would write anything--AI or otherwise--in Python and actually try to ship it. That is only language on the planet that can work on your own box, work in a Docker machine on your own box in testing, and then get rolled out via CI/CD to your Kubernetes cluster and promptly fail...
>
> You gotta be kidding me...
>
> The thing is, I never write Python on my own if I don't have to. I will choose, Rust, Go, TypeScript, ANYTHING over Python. It was my AI agent that decided that it was going to write a new service that handles webhooks between Ory Kratos and other systems protected by it to propagate changes in user registration that must flow downstream to 2 other apps I have there.
>
> If I could, I would punch that AI agent in the face right now...
>
> The hour I spent messing with that, I could have written and deployed like 3 other apps from start to finish...

### Post 3 — LinkedIn (humor, ultra-short)

> I had to cuss out one of my coding bots this morning for breaking architecture rules I had put in place--documented in CLAUDE.md and AGENTS.md and everywhere. I cussed that bot out GOOD! Good thing bots don't have an HR to run to. I would be canceled already this morning before I finished my coffee...
>
> --Worst AI Boss Ever

### Post 4 — LinkedIn (quote share, ultra-short)

> "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."
> —Galatians 6:9
>
> Our quote of the day…

### Post 5 — LinkedIn (long-form written-social; opinion/manifesto)

> The cancellation threat against Jimmy Kimmel for speaking uncomfortable truths reveals a fundamental paradox: those claiming to champion First Amendment rights are simultaneously engineering the most aggressive censorship apparatus we've seen. This isn't just about late-night comedy—it's about the systematic dismantling of democratic discourse.
>
> Consider this: The Trump administration quietly removed a National Institute of Justice report documenting far-right domestic terrorism as our greatest statistical threat. Meanwhile, comedians face cancellation for fact-based monologues. The asymmetry is staggering.
>
> But here's where we flip the script.
>
> The technology sector holds the keys to democratizing information flow through three strategic implementations:
>
> 1. Direct Creator-to-Consumer Distribution
> Eliminate parasitic intermediaries extracting billions while contributing zero value. Content creators deserve direct channels to their audiences without corporate gatekeepers deciding what gets seen.
>
> 2. Decentralized Discovery Through User Sovereignty
> Deploy AI and distributed architectures to build discovery systems controlled by users, not algorithms optimized for engagement metrics. As highlighted by Mark Cuban some time ago, AT Protocol provides this exact framework—decentralized social networking where YOU control your feed parameters, not Facebook or YouTube.
>
> 3. Infrastructure Democratization via Distributed Streaming
> Technologies like Livepeer and LiveKit enable individually-owned nodes for content distribution and collaboration. This creates:
>
> - Censorship-resistant streaming
> - Scalable infrastructure without central control
> - Revenue opportunities for node operators
> - True peer-to-peer content delivery
>
> The Prometheus AI Framework and platform provides all of these parts together, using AI for intelligent discovery, search and recommendations.
>
> Our AI and media platforms are architected specifically for this paradigm shift. We're building the technical infrastructure for information sovereignty—where truth isn't filtered through corporate or political lenses.
>
> This transcends partisan politics. Whether you're Republican, Democrat, Libertarian, Christian, Buddhist, Muslim, or LGBTQ+—your fundamental right to exist, express, and access unfiltered information is non-negotiable.
>
> The question isn't whether we CAN build these systems—we already are. The question is whether we'll deploy them fast enough to preserve democratic discourse.
>
> The technology exists. The frameworks are proven. The only variable is our collective will to implement them.
>
> Who's ready to build the uncensorable future?
> #FreeSpeech #Decentralization #Web3 #AI #Democracy #TechForGood #DistributedSystems #ContentCreators #Innovation

---

## Spoken transcript (→ Change P — spoken/conversational)

Conference talk, Ory Summit 2023 — "Identity + AI = Intelligent Applications." Published on Ory Corp YouTube, 2024-02-08. ~21 minutes. This is a recorded delivered talk — the highest-signal spoken substrate available.

> [Introduction by host]
> "Our next speaker comes all the way from Texas. He and I worked for the same company for a while called Microsoft. He's very devoted to the world of healthcare and especially mental health, and he's been using AI for a few years. He's a big and excited fan of what Ory is doing, so we're very happy to have him here today. He is going to talk to us about his application in the healthcare space and some of the challenges he faced developing that with AI, and maybe some of the highlights as well. Travis, thank you for coming and good luck."

> [0:48 — About Travis and Tribe Health Solutions]
> I'm Travis James and I'm from Dallas, Texas — the home of the world's favorite sports franchise, the Dallas Cowboys. *(Sorry. Yeah, they're like number three or four, you know.)*
> But seriously, I love the Ory product. We've had it adopted for a long time by a company called Tribe Health Solutions.
> What we do is build data management solutions for healthcare. Right now we're focused more on mental health, but it's really generically across all healthcare — to help individuals take control of their own user data: how they collect it and how they share it. You'll see where this leads to some interesting questions when it comes to the use of identity.

> [1:57 — Tribe Core Platform Architecture]
> At the core of our product is a thing we call Tribe Core — our core platform, of which Ory is a huge part.
> There are two very important parts of our platform: Ory, which provides our identity management, and Supabase, which provides a sidecar to your database with functionality similar to Firebase.
> Supabase allows you to expose APIs, GraphQL, and OpenAPI interfaces based off the schema. Using our platform — very similar to low-code/no-code systems — you can specify the types of things that you want to manage and the rights behind those things.
> Those rights are implemented by Ory products including Hydra, Keto, and Kratos. This allows you to patch together a framework for handling workflows related to your data and integrations to external entities.

> [3:13 — AI as a Core Platform Principle]
> What we have found is that it's very important to have all of your AI principles as part of your core platform as opposed to trying to bolt it on later.
> That's where Supabase helps a lot — they provide a vector database that you can use for similarity search or to help you interact with large language models by adding context to your prompts.
> The functions facility provides us a way to integrate with various generative AI models using those vector components. We hook into knowing when a user has logged in so we can automatically generate all of the structures needed to handle their personal data stored in our platform. We also leverage all of this to build plugins for ChatGPT.

> [4:21 — Decentralization and Sovereign Healthcare Data]
> A core principle of ours — in order to really allow users to take full control of their medical data — is decentralization.
> You really can't accomplish it by just creating another silo and sticking all the data in there. Users must become the sovereign owner of their own data.
> The way we do this is by piggybacking off the work of IPFS, based on libp2p, which allows us to describe an infrastructure of nodes that communicate with each other. We use conflict-free resolution to replicate all of the CIDs related to either data or files — creating structures of data that get pushed throughout the infrastructure.

> [5:24 — Healthcare Node Architecture]
> We have healthcare system nodes, ecosystem provider nodes, imaging center integrations, IPFS replication.
> My brother is a spine surgeon in Southlake, Texas. One of our first prototypes allowed MRI scans from imaging centers to replicate automatically via IPFS to his system — appearing directly in the DICOM viewers he already used. That eliminated roughly 35 minutes of manual workflow involving CDs, file copies, and imports.

> [6:35 — Mental Health Use Case]
> The use case I want to talk about is our mental health use case. This is very personal for me because I have a 23-year-old son who is schizophrenic.
> My son is also a phenomenal artist and musician. He's self-taught. The things he can do are amazing. A lot of times mental illness goes hand-in-hand with these gifts.
> It's easy to say "ship them off to some institution," but then he gets heavily medicated, his gifts are dulled, and he's lost forever.
> One of the things that's been a passion of mine is putting together tools and an ecosystem that will allow me to manage his care, ensure medical history is preserved, transfer psychiatric history between providers, track medications and dosages, journal emotional states and experiences, create longitudinal patient context.
> To do that, you need a system like what we're building.

> [7:53 — Mental Health Assessments and Privacy]
> Patients can take assessments that determine where they are on the spectrum of psychiatric conditions, including ADHD, PTSD, bipolar disorder, schizophrenia, other psychiatric illnesses.
> One assessment called the "Mini Exam" can take up to two hours. The important thing is that once this data is collected, it is encrypted and stored specifically for that patient.
> Because there is stigma associated with mental illness — especially in the United States — we built a system for police officers to help them get mental healthcare in response to traumatic experiences. Police officers often don't want anyone to know they're even seeking mental health support.
> Our system brings content directly to them, allows private assessments, securely stores encrypted results, lets users selectively share data when seeking treatment.
> When users decide to seek help, they can use their identity to provide keys to encrypted data and securely share it with healthcare providers.

> [9:26 — Generative AI + User Context]
> When it comes to generative AI, the key is attaching user context to prompts in a ubiquitous way.
> We want to take a user identity, use Supabase vector database support, pull contextual information, funnel it through a LangChain pipeline, produce personalized responses.
> We can store user context inside a SQLite database. Every machine has some implementation for SQLite, and many support SQLCipher. This allows encryption of user context, portable contextual databases, out-of-band key management, standardized schemas for AI retrieval.
> Example query flow: select demographic embedding, retrieve contextual information, combine user context with system knowledge, generate highly personalized mental healthcare guidance.

> [11:09 — Decentralized Identity + Wallets]
> We explored options for storing user context under full user control using IPFS, decentralized identity, verifiable credentials, wallet-based identity.
> We work with the Decentralized Identity Foundation to enable opaque identity representations stored inside wallets. These can be paired with verifiable credentials to certify users possess certain credentials. We can then use OpenID Connectors to associate decentralized identities back to an Ory identity.
> This becomes especially exciting with passkeys. A user could authenticate using a wallet, use a passkey, seamlessly access encrypted context data, pull AI context from IPFS, authenticate into any participating system.

> [13:01 — Future of Local and Edge AI]
> All of this assumes you're talking to hosted models like ChatGPT, Claude, or other hosted LLMs — but the landscape is rapidly evolving.
> The future isn't necessarily about trillion-parameter models. It's about smaller models, purpose-tuned models, task-specific models.
> Models such as Zephyr, Mistral, and Llama can run in 7B parameter sizes and can be converted to run on almost any device. Zephyr in particular is approaching GPT-4 and Claude performance levels. I'd encourage everyone to explore Hugging Face.

> [14:27 — Edge AI Deployment]
> Because smaller models can achieve high efficiency, you can now perform generative AI on the edge.
> Quantize models, convert models to ONNX format, deploy to CoreML on iOS, TensorFlow Lite on Android, llama.cpp with GGUF quantization on desktop.
> This enables lower power usage, local inference, minimal quality loss, device-native acceleration.

> [16:16 — Self-Hosting AI Models]
> This gives you the ability to self-host your models. We've all seen OpenAI/ChatGPT outages — the risks of dependency on centralized providers are real.
> Benefits of self-hosting include no token charges, faster fine-tuning, resilience to outages, user-specific personalization.
> Models can be distributed using IPFS. Over time user interactions improve models, models become personalized, fine-tuned versions sync across all devices, users can opt into sharing anonymized improvements.
> The system becomes iteratively smarter for each individual user.

> [18:24 — Healthcare for Everybody]
> The "big hairy goal" is enabling healthcare for everybody.
> Current healthcare systems have healthier people subsidizing sicker populations. Instead, we propose leveraging the value of medical data itself.
> Users could opt into sharing demographic data, contribute to medical research, earn compensation, improve model diversity, reduce AI bias.
> Many models are biased because internet data disproportionately reflects white male demographics — this creates serious problems in healthcare AI systems. Lack of ethnic diversity in training data is a real and underappreciated risk.

> [20:20 — Wearables and Contextual Health Intelligence]
> Using wearable devices such as the Oura Ring to track sleep, recovery, stress, readiness scores, and training load — contextual health data can combine with AI systems to predict stress breakdowns, improve mental health interventions, enhance overall quality of life.

> [21:20 — Closing Remarks]
> Those are the things we're working on. If you have any questions, I'd like to field some.
