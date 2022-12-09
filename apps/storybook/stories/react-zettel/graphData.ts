import { GraphData } from '@tereza-tech/react-zettel';

export const fewData: GraphData = {
  nodes: [
    {
      id: '/diffuse-thinking',
      group: 'note',
      label: 'Diffuse Thinking',
    },
    {
      id: '/learning-using-zettelkasten',
      group: 'note',
      label: 'Learning Using Zettelkasten',
    },
    { id: '/zettelkasten', group: 'note', label: 'Zettelkasten' },
    {
      id: '/programming/javascript',
      group: 'note',
      label: 'JavaScript',
    },
    { id: '#brain', group: 'tag', label: '#brain' },
    { id: '#javascript', group: 'tag', label: '#javascript' },
    { id: '#learning', group: 'tag', label: '#learning' },
    { id: '#programming', group: 'tag', label: '#programming' },
    { id: '#zettelkasten', group: 'tag', label: '#zettelkasten' },
  ],
  links: [
    { target: '/learning-using-zettelkasten', source: '/zettelkasten' },
    {
      target: '/learning-using-zettelkasten',
      source: '/diffuse-thinking',
    },
    { target: '/diffuse-thinking', source: '#brain' },
    { target: '/diffuse-thinking', source: '#learning' },
    { target: '/learning-using-zettelkasten', source: '#learning' },
    { target: '/learning-using-zettelkasten', source: '#zettelkasten' },
    { target: '/zettelkasten', source: '#learning' },
    { target: '/zettelkasten', source: '#zettelkasten' },
    { target: '/programming/javascript', source: '#javascript' },
    { target: '/programming/javascript', source: '#programming' },
  ],
};

export const manyData: GraphData = {
  nodes: [
    {
      id: '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
      group: 'note',
      label:
        'Control WIP by Relaxing the Targets for a Unit Cost at Production',
    },
    {
      id: '/zettel/demand-focused-approaches-to-control-wip',
      group: 'note',
      label: 'Demand-Focused Approaches to Control WIP',
    },
    {
      id: '/zettel/identify-in-advance-which-requirements-you-would-consider-eliminating-or-relaxing',
      group: 'note',
      label:
        'Identify in Advance Which Requirements You Would Consider Eliminating or Relaxing',
    },
    {
      id: '/zettel/types-of-applications',
      group: 'note',
      label: 'Types of Applications',
    },
    {
      id: '/zettel/control-wip-by-shedding-requirements',
      group: 'note',
      label: 'Control WIP by Shedding Requirements',
    },
    {
      id: '/zettel/when-wip-is-high-purge-low-value-projects',
      group: 'note',
      label: 'When WIP Is High, Purge Low-Value Projects',
    },
    {
      id: '/zettel/anchoring-bias',
      group: 'note',
      label: 'Anchoring Bias',
    },
    {
      id: '/zettel/confirmation-bias',
      group: 'note',
      label: 'Confirmation Bias',
    },
    {
      id: '/zettel/groupthink',
      group: 'note',
      label: 'Groupthink',
    },
    {
      id: '/zettel/chief-executive-officer-ceo',
      group: 'note',
      label: 'Chief Executive Officer (CEO)',
    },
    {
      id: '/zettel/chief-operation-officer-coo',
      group: 'note',
      label: 'Chief Operation Officer (COO)',
    },
    {
      id: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      group: 'note',
      label: 'Factors to Consider when Making a Strategic Decision',
    },
    {
      id: '/zettel/mental-models-overcome-cognitive-biases',
      group: 'note',
      label: 'Mental Models Overcome Cognitive Biases',
    },
    {
      id: '/zettel/operations-departments-of-a-tech-company',
      group: 'note',
      label: 'Operations Departments of a Tech Company',
    },
    {
      id: '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      group: 'note',
      label: "Strategic Decisions that Impact the Company's Long-Term Success",
    },
    {
      id: '/zettel/swot-analysis',
      group: 'note',
      label: 'SWOT Analysis',
    },
    {
      id: '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      group: 'note',
      label: 'The Economics of Holding WIP Changes when Queue Size Changes',
    },
    {
      id: '/zettel/zombie-projects',
      group: 'note',
      label: 'Zombie Projects',
    },
    {
      id: '/zettel/startup-operations',
      group: 'note',
      label: 'Startup Operations',
    },
    {
      id: '/zettel/block-all-demand-when-wip-reaches-its-upper-limit',
      group: 'note',
      label: 'Block All Demand when WIP Reaches Its Upper Limit',
    },
    {
      id: '/zettel/economic-waste-that-queues-create',
      group: 'note',
      label: 'Economic Waste that Queues Create',
    },
    {
      id: '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      group: 'note',
      label:
        'Most of the Damage Done by a Queue Is Caused by High-Queues States',
    },
    {
      id: '/what-is-product-strategy-and-why-is-it-important',
      group: 'note',
      label: 'What Is Product Strategy, and Why Is It Important?',
    },
    {
      id: '/zettel/product-strategy-roadmap',
      group: 'note',
      label: 'Product Strategy Roadmap',
    },
    {
      id: '/zettel/product-strategy-tools',
      group: 'note',
      label: 'Product Strategy Tools',
    },
    {
      id: '/zettel/product-strategy',
      group: 'note',
      label: 'Product Strategy',
    },
    {
      id: '/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes',
      group: 'note',
      label: 'Fixed WIP Couples the Batch Sizes of Adjacent Processes',
    },
    {
      id: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      group: 'note',
      label: 'Slack and Queue Capacity Utilization Are Correlated',
    },
    {
      id: '/zettel/when-response-time-is-important-measure-response-time',
      group: 'note',
      label: 'When Response Time Is Important, Measure Response Time',
    },
    {
      id: '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      group: 'note',
      label:
        'Enhance the Effectiveness of WIP Constraints by Cross-Training Workers',
    },
    {
      id: '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      group: 'note',
      label:
        "The Kanban System Doesn't Make Assumptions About the Location of Bottlenecks",
    },
    {
      id: '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      group: 'note',
      label:
        'The Local Constraints of the Kanban System Have an Impressive Feedback Speed',
    },
    {
      id: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      group: 'note',
      label: 'Kanban Uses WIP Constraints to Control the Cycle Time',
    },
    {
      id: '/zettel/kanban-pull-principle',
      group: 'note',
      label: 'Kanban Pull Principle',
    },
    {
      id: '/zettel/cross-functional-team',
      group: 'note',
      label: 'Cross-Functional Team',
    },
    {
      id: '/zettel/theory-of-constraints-toc-elevating-the-constraint',
      group: 'note',
      label: 'Theory of Constraints (TOC) - Elevating the Constraint',
    },
    {
      id: '/zettel/theory-of-constraints-toc',
      group: 'note',
      label: 'Theory of Constraints (TOC)',
    },
    {
      id: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      group: 'note',
      label: 'Effects of Set a Limit on WIP (Work in Process)',
    },
    {
      id: '/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods',
      group: 'note',
      label:
        'Queues Randomly Spin Seriously Out of Control and Remain in This State for Long Periods',
    },
    {
      id: '/zettel/small-batch-size-activities-increase-trust',
      group: 'note',
      label: 'Small Batch-Size Activities Increase Trust',
    },
    {
      id: '/zettel/social-expectancy-theory',
      group: 'note',
      label: 'Social Expectancy Theory',
    },
    {
      id: '/zettel/queues-in-product-development',
      group: 'note',
      label: 'Queues in Product Development',
    },
    {
      id: '/zettel/impact-bias',
      group: 'note',
      label: 'Impact Bias',
    },
    {
      id: '/zettel/kanban',
      group: 'note',
      label: 'Kanban',
    },
    {
      id: '/zettel/work-in-process-wip',
      group: 'note',
      label: 'Work in Process (WIP)',
    },
    {
      id: '/zettel/round-robin-scheduling',
      group: 'note',
      label: 'Round-Robin Scheduling',
    },
    {
      id: '/the-feynman-mental-model-technique',
      group: 'note',
      label: 'The Feynman Mental Model Technique',
    },
    {
      id: '/zettel/first-principles-thinking',
      group: 'note',
      label: 'First Principles Thinking',
    },
    {
      id: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      group: 'note',
      label: 'Article: The 5 Dysfunctions of Product Management Teams',
    },
    {
      id: '/great-good-okay-and-bad-product-managers',
      group: 'note',
      label: 'Great, Good, Okay, and Bad Product Managers',
    },
    {
      id: '/zettel/think-and-grow-rich-the-major-attributes-of-leadership',
      group: 'note',
      label: 'Think and Grow Rich - The Major Attributes of Leadership',
    },
    {
      id: '/zettel/proprietary-product-distribution',
      group: 'note',
      label: 'Proprietary Product Distribution',
    },
    {
      id: '/zettel/personas',
      group: 'note',
      label: 'Personas',
    },
    {
      id: '/zettel/value-proposition',
      group: 'note',
      label: 'Value Proposition',
    },
    {
      id: '/zettel/ethos',
      group: 'note',
      label: 'Ethos',
    },
    {
      id: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      group: 'note',
      label: 'Article: What Happens When You Stop Eating All Sugar',
    },
    {
      id: '/zettel/flow-efficiency',
      group: 'note',
      label: 'Flow Efficiency',
    },
    {
      id: '/zettel/article-an-effortless-way-to-improve-your-memory',
      group: 'note',
      label: 'Article: An Effortless Way to Improve Your Memory',
    },
    {
      id: '/zettel/cycle-time',
      group: 'note',
      label: 'Cycle Time',
    },
    {
      id: '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      group: 'note',
      label:
        'Fundamentals for Recruiters that Make People Want to Work with You',
    },
    {
      id: '/zettel/startup-burn-rate',
      group: 'note',
      label: 'Startup Burn Rate',
    },
    {
      id: '/zettel/cost-of-delay',
      group: 'note',
      label: 'Cost of Delay',
    },
    {
      id: '/zettel/business-agility',
      group: 'note',
      label: 'Business Agility',
    },
    {
      id: '/zettel/product-management',
      group: 'note',
      label: 'Product Management',
    },
    {
      id: '/zettel/product-manager',
      group: 'note',
      label: 'Product Manager',
    },
    {
      id: '/zettel/product-owner',
      group: 'note',
      label: 'Product Owner',
    },
    {
      id: '/zettel/the-pyramid-principle',
      group: 'note',
      label: 'The Pyramid Principle',
    },
    {
      id: '/zettel/startup-ceo',
      group: 'note',
      label: 'Startup CEO',
    },
    {
      id: '/zettel/startup-co-ce-os-problems',
      group: 'note',
      label: 'Startup Co-CEOs Problems',
    },
    {
      id: '/zettel/startup-founding-team-roles',
      group: 'note',
      label: 'Startup Founding Team Roles',
    },
    {
      id: '/zettel/operating-outside-a-circle-of-competence',
      group: 'note',
      label: 'Operating Outside a Circle of Competence',
    },
    {
      id: '/zettel/building-and-maintaining-a-circle-of-competence',
      group: 'note',
      label: 'Building and Maintaining a Circle of Competence',
    },
    {
      id: '/zettel/circle-of-competence',
      group: 'note',
      label: 'Circle of Competence',
    },
    {
      id: '/zettel/functional-fixedness',
      group: 'note',
      label: 'Functional Fixedness',
    },
    {
      id: '/zettel/the-four-types-of-consequences',
      group: 'note',
      label: 'The Four Types of Consequences',
    },
    {
      id: '/five-habits-for-the-next-five-years-first-year',
      group: 'note',
      label: 'Five Habits for the Next Five Years - First Year',
    },
    {
      id: '/zettel/human-nature-explanations',
      group: 'note',
      label: 'Human Nature Explanations',
    },
    {
      id: '/zettel/little-s-law',
      group: 'note',
      label: "Little's Law",
    },
    {
      id: '/zettel/cumulative-flow-diagram-cfd',
      group: 'note',
      label: 'Cumulative Flow Diagram (CFD)',
    },
    {
      id: '/zettel/csd-matrix',
      group: 'note',
      label: 'CSD Matrix',
    },
    {
      id: '/zettel/the-benefits-of-formal-education',
      group: 'note',
      label: 'The Benefits of Formal Education',
    },
    {
      id: '/zettel/the-miles-framework',
      group: 'note',
      label: 'The MILES Framework',
    },
    {
      id: '/zettel/reality-growth-mindset',
      group: 'note',
      label: 'Reality-Growth Mindset',
    },
    {
      id: '/zettel/agile-methodologies',
      group: 'note',
      label: 'Agile Methodologies',
    },
    {
      id: '/zettel/scrum-master',
      group: 'note',
      label: 'Scrum Master',
    },
    {
      id: '/zettel/diffusion-of-innovations-adopter-categories',
      group: 'note',
      label: 'Diffusion of Innovations - Adopter Categories',
    },
    {
      id: '/zettel/twelve-principles-of-agile-software',
      group: 'note',
      label: 'Twelve Principles of Agile Software',
    },
    {
      id: '/meditation-roadmap',
      group: 'note',
      label: 'Meditation Roadmap',
    },
    {
      id: '/zettel/phonological-loop',
      group: 'note',
      label: 'Phonological Loop',
    },
    {
      id: '/zettel/visuospatial-sketchpad',
      group: 'note',
      label: 'Visuospatial Sketchpad',
    },
    {
      id: '/what-are-mission-vision-and-values',
      group: 'note',
      label: 'What Are Mission, Vision, and Values?',
    },
    {
      id: '/zettel/innovation',
      group: 'note',
      label: 'Innovation',
    },
    {
      id: '/zettel/purposeful-stupidity',
      group: 'note',
      label: 'Purposeful Stupidity',
    },
    {
      id: '/newsletter-v1',
      group: 'note',
      label: 'Newsletter V1',
    },
    {
      id: '/zettel/exponential-technology',
      group: 'note',
      label: 'Exponential Technology',
    },
    {
      id: '/zettel/moore-s-law',
      group: 'note',
      label: "Moore's Law",
    },
    {
      id: '/zettel/m-g-1-queue',
      group: 'note',
      label: 'M/G/1 Queue',
    },
    {
      id: '/zettel/octave-interval',
      group: 'note',
      label: 'Octave Interval',
    },
    {
      id: '/zettel/lno-effectiveness-framework',
      group: 'note',
      label: 'LNO Effectiveness Framework',
    },
    {
      id: '/zettel/virality-potential-criteria',
      group: 'note',
      label: 'Virality Potential Criteria',
    },
    {
      id: '/zettel/winner-s-curse',
      group: 'note',
      label: "Winner's Curse",
    },
    {
      id: '/zettel/network-effects',
      group: 'note',
      label: 'Network Effects',
    },
    {
      id: '/zettel/accountability-psychological-trigger',
      group: 'note',
      label: 'Accountability Psychological Trigger',
    },
    {
      id: '/zettel/authority-psychological-trigger',
      group: 'note',
      label: 'Authority Psychological Trigger',
    },
    {
      id: '/zettel/vedas',
      group: 'note',
      label: 'Vedas',
    },
    {
      id: '/zettel/endocrine-glands-and-chakras-correlation',
      group: 'note',
      label: 'Endocrine Glands and Chakras Correlation',
    },
    {
      id: '/zettel/fight-or-flight',
      group: 'note',
      label: 'Fight or Flight',
    },
    {
      id: '/zettel/thalamus',
      group: 'note',
      label: 'Thalamus',
    },
    {
      id: '/zettel/maslow-s-hierarchy-of-needs',
      group: 'note',
      label: "Maslow's Hierarchy of Needs",
    },
    {
      id: '/zettel/base-chakra',
      group: 'note',
      label: 'Base Chakra',
    },
    {
      id: '/zettel/hormones',
      group: 'note',
      label: 'Hormones',
    },
    {
      id: '/zettel/testosterone',
      group: 'note',
      label: 'Testosterone',
    },
    {
      id: '/zettel/queue-capacity-utilization',
      group: 'note',
      label: 'Queue Capacity Utilization',
    },
    {
      id: '/zettel/queue-service-process',
      group: 'note',
      label: 'Queue Service Process',
    },
    {
      id: '/zettel/anecdotal-evidence',
      group: 'note',
      label: 'Anecdotal Evidence',
    },
    {
      id: '/zettel/cognitive-bias',
      group: 'note',
      label: 'Cognitive Bias',
    },
    {
      id: '/zettel/heuristic',
      group: 'note',
      label: 'Heuristic',
    },
    {
      id: '/zettel/inductive-argument',
      group: 'note',
      label: 'Inductive Argument',
    },
    {
      id: '/zettel/critical-path',
      group: 'note',
      label: 'Critical Path',
    },
    {
      id: '/zettel/markov-process',
      group: 'note',
      label: 'Markov Process',
    },
    {
      id: '/zettel/queueing-theory',
      group: 'note',
      label: 'Queueing Theory',
    },
    {
      id: '/zettel/vp-of-engineering',
      group: 'note',
      label: 'VP of Engineering',
    },
    {
      id: '/zettel/asymmetric-opportunity',
      group: 'note',
      label: 'Asymmetric Opportunity',
    },
    {
      id: '/zettel/newsvendor-model',
      group: 'note',
      label: 'Newsvendor Model',
    },
    {
      id: '/zettel/venture-backable-business',
      group: 'note',
      label: 'Venture Backable Business',
    },
    {
      id: '/zettel/set-based-concurrent-engineering',
      group: 'note',
      label: 'Set-Based Concurrent Engineering',
    },
    {
      id: '/zettel/marginal-analysis',
      group: 'note',
      label: 'Marginal Analysis',
    },
    {
      id: '/zettel/key-value-database',
      group: 'note',
      label: 'Key-Value Database',
    },
    {
      id: '/zettel/sunk-cost',
      group: 'note',
      label: 'Sunk Cost',
    },
    {
      id: '/zettel/brandolini-s-law',
      group: 'note',
      label: "Brandolini's Law",
    },
    {
      id: '/zettel/design-system',
      group: 'note',
      label: 'Design System',
    },
    {
      id: '/zettel/pareto-paradox',
      group: 'note',
      label: 'Pareto Paradox',
    },
    {
      id: '/zettel/pareto-principle',
      group: 'note',
      label: 'Pareto Principle',
    },
    {
      id: '/zettel/matrix-determinant',
      group: 'note',
      label: 'Matrix Determinant',
    },
    {
      id: '/zettel/vector-space',
      group: 'note',
      label: 'Vector Space',
    },
    {
      id: '/zettel/proxy-variable',
      group: 'note',
      label: 'Proxy Variable',
    },
    {
      id: '/zettel/goodhart-s-law',
      group: 'note',
      label: "Goodhart's Law",
    },
    {
      id: '/from-reactive-planning-model-to-natural-planning-model',
      group: 'note',
      label: 'From Reactive Planning Model to Natural Planning Model',
    },
    {
      id: '/zettel/benjamin-franklin-s-schedule',
      group: 'note',
      label: "Benjamin Franklin's Schedule",
    },
    {
      id: '/a-letter-to-my-friend-create',
      group: 'note',
      label: 'A Letter to My Friend - Create',
    },
    {
      id: '/zettel/radical-delegation-framework',
      group: 'note',
      label: 'Radical Delegation Framework',
    },
    {
      id: '/zettel/natural-planning-model',
      group: 'note',
      label: 'Natural Planning Model',
    },
    {
      id: '/zettel/reactive-planning-model',
      group: 'note',
      label: 'Reactive Planning Model',
    },
    {
      id: '/zettel/spacing-effect-learning',
      group: 'note',
      label: 'Spacing Effect (Learning)',
    },
    {
      id: '/zettel/opportunity-cost',
      group: 'note',
      label: 'Opportunity Cost',
    },
    {
      id: '/zettel/context-switching',
      group: 'note',
      label: 'Context Switching',
    },
    {
      id: '/zettel/focus-brings-unconscious-support',
      group: 'note',
      label: 'Focus Brings Unconscious Support',
    },
    {
      id: '/zettel/ownership-may-prevent-parkinson-s-law',
      group: 'note',
      label: "Ownership May Prevent Parkinson's Law",
    },
    {
      id: '/zettel/daily-scrum',
      group: 'note',
      label: 'Daily Scrum',
    },
    {
      id: '/skydiving-terminal-velocity',
      group: 'note',
      label: 'Skydiving Terminal Velocity',
    },
    {
      id: '/zettel/brainstorming',
      group: 'note',
      label: 'Brainstorming',
    },
    {
      id: '/zettel/distributed-cognition',
      group: 'note',
      label: 'Distributed Cognition',
    },
    {
      id: '/zettel/slack-and-efficiency',
      group: 'note',
      label: 'Slack and Efficiency',
    },
    {
      id: '/my-story-the-dance-teacher',
      group: 'note',
      label: 'My Story - The Dance Teacher',
    },
    {
      id: '/zettel/acid-database-systems',
      group: 'note',
      label: 'ACID (Database Systems)',
    },
    {
      id: '/zettel/the-threefold-model-for-identifying-daily-work',
      group: 'note',
      label: 'The Threefold Model for Identifying Daily Work',
    },
    {
      id: '/zettel/people-systematically-overlook-subtractive-changes',
      group: 'note',
      label: 'People Systematically Overlook Subtractive Changes',
    },
    {
      id: '/zettel/system-mental-models',
      group: 'note',
      label: 'System Mental Models',
    },
    {
      id: '/zettel/decision-mental-models',
      group: 'note',
      label: 'Decision Mental Models',
    },
    {
      id: '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      group: 'note',
      label: 'The Four-Criteria Model for Choosing Actions in the Moment',
    },
    {
      id: '/zettel/smart-contracts',
      group: 'note',
      label: 'Smart Contracts',
    },
    {
      id: '/zettel/atkinson-shiffrin-memory-model',
      group: 'note',
      label: 'Atkinson-Shiffrin Memory Model',
    },
    {
      id: '/zettel/long-term-memory',
      group: 'note',
      label: 'Long-Term Memory',
    },
    {
      id: '/zettel/short-term-memory',
      group: 'note',
      label: 'Short-Term Memory',
    },
    {
      id: '/zettel/ideas-in-open-loop',
      group: 'note',
      label: 'Ideas in Open Loop',
    },
    {
      id: '/zettel/pleasure-principle-psychology',
      group: 'note',
      label: 'Pleasure Principle (Psychology)',
    },
    {
      id: '/zettel/procrastination',
      group: 'note',
      label: 'Procrastination',
    },
    {
      id: '/zettel/hyperbolic-discounting',
      group: 'note',
      label: 'Hyperbolic Discounting',
    },
    {
      id: '/zettel/mental-models',
      group: 'note',
      label: 'Mental Models',
    },
    {
      id: '/books/no-b-s-time-management-for-entrepreneurs',
      group: 'note',
      label: 'No B.S. Time Management for Entrepreneurs',
    },
    {
      id: '/zettel/dopamine',
      group: 'note',
      label: 'Dopamine',
    },
    {
      id: '/zettel/social-media-addiction',
      group: 'note',
      label: 'Social Media Addiction',
    },
    {
      id: '/zettel/dan-s-kennedy',
      group: 'note',
      label: 'Dan S. Kennedy',
    },
    {
      id: '/zettel/product-market-fit',
      group: 'note',
      label: 'Product/Market Fit',
    },
    {
      id: '/zettel/organic-social-media',
      group: 'note',
      label: 'Organic Social Media',
    },
    {
      id: '/zettel/paid-social-media',
      group: 'note',
      label: 'Paid Social Media',
    },
    {
      id: '/zettel/human-multitasking',
      group: 'note',
      label: 'Human Multitasking',
    },
    {
      id: '/last-mile-in-a-software-project',
      group: 'note',
      label: 'Last Mile in a Software Project',
    },
    {
      id: '/zettel/startup-accelerator',
      group: 'note',
      label: 'Startup Accelerator',
    },
    {
      id: '/zettel/venture-building-s-startups-problems',
      group: 'note',
      label: "Venture Building's Startups Problems",
    },
    {
      id: '/zettel/venture-capital',
      group: 'note',
      label: 'Venture Capital',
    },
    {
      id: '/zettel/startup-incubator',
      group: 'note',
      label: 'Startup Incubator',
    },
    {
      id: '/zettel/startup-studio',
      group: 'note',
      label: 'Startup Studio',
    },
    {
      id: '/zettel/proof-of-work',
      group: 'note',
      label: 'Proof of Work',
    },
    {
      id: '/zettel/scrum',
      group: 'note',
      label: 'Scrum',
    },
    {
      id: '/zettel/inflation',
      group: 'note',
      label: 'Inflation',
    },
    {
      id: '/zettel/money-supply',
      group: 'note',
      label: 'Money Supply',
    },
    {
      id: '/zettel/the-90-90-rule',
      group: 'note',
      label: 'The 90-90 Rule',
    },
    {
      id: '/zettel/last-mile-problem',
      group: 'note',
      label: 'Last Mile Problem',
    },
    {
      id: '/zettel/dunning-kruger-effect',
      group: 'note',
      label: 'Dunning-Kruger Effect',
    },
    {
      id: '/zettel/flow-state-psychology',
      group: 'note',
      label: 'Flow State (Psychology)',
    },
    {
      id: '/zettel/agile',
      group: 'note',
      label: 'Agile',
    },
    {
      id: '/zettel/law-of-triviality',
      group: 'note',
      label: 'Law of Triviality',
    },
    {
      id: '/zettel/parkinson-s-law',
      group: 'note',
      label: "Parkinson's Law",
    },
    {
      id: '/five-habits-for-the-next-five-years',
      group: 'note',
      label: 'Five Habits for the Next Five Years',
    },
    {
      id: '/zettel/lightning-decision-jam',
      group: 'note',
      label: 'Lightning Decision Jam',
    },
    {
      id: '/zettel/aida-model',
      group: 'note',
      label: 'AIDA Model',
    },
    {
      id: '/zettel/design-density',
      group: 'note',
      label: 'Design - Density',
    },
    {
      id: '/zettel/psychological-trigger',
      group: 'note',
      label: 'Psychological Trigger',
    },
    {
      id: '/zettel/better-writing',
      group: 'note',
      label: 'Better Writing',
    },
    {
      id: '/zettel/facts-don-t-change-our-minds',
      group: 'note',
      label: "Facts Don't Change Our Minds",
    },
    {
      id: '/zettel/information-and-digital-content-in-modern-society',
      group: 'note',
      label: 'Information and Digital Content in Modern Society',
    },
    {
      id: '/zettel/reading-metacognitively',
      group: 'note',
      label: 'Reading Metacognitively',
    },
    {
      id: '/zettel/the-feynman-technique',
      group: 'note',
      label: 'The Feynman Technique',
    },
    {
      id: '/zettel/sleep-in-two-shifts',
      group: 'note',
      label: 'Sleep in Two Shifts',
    },
    {
      id: '/zettel/chunking-and-memory',
      group: 'note',
      label: 'Chunking and Memory',
    },
    {
      id: '/zettel/metaphors-to-explain-the-brain',
      group: 'note',
      label: 'Metaphors to Explain the Brain',
    },
    {
      id: '/zettel/the-evolution-of-anxiety',
      group: 'note',
      label: 'The Evolution of Anxiety',
    },
    {
      id: '/zettel/zettelkasten',
      group: 'note',
      label: 'Zettelkasten',
    },
    {
      id: '500-startups',
      group: 'tag',
      label: '#500-startups',
    },
    {
      id: '80-20-rule',
      group: 'tag',
      label: '#80-20-rule',
    },
    {
      id: '90-90-rule',
      group: 'tag',
      label: '#90-90-rule',
    },
    {
      id: 'abraham-maslow',
      group: 'tag',
      label: '#abraham-maslow',
    },
    {
      id: 'acquisitions',
      group: 'tag',
      label: '#acquisitions',
    },
    {
      id: 'addiction',
      group: 'tag',
      label: '#addiction',
    },
    {
      id: 'agile',
      group: 'tag',
      label: '#agile',
    },
    {
      id: 'agile-framework',
      group: 'tag',
      label: '#agile-framework',
    },
    {
      id: 'agile-manifesto',
      group: 'tag',
      label: '#agile-manifesto',
    },
    {
      id: 'agner-krarup-erlang',
      group: 'tag',
      label: '#agner-krarup-erlang',
    },
    {
      id: 'alberto-brandolini',
      group: 'tag',
      label: '#alberto-brandolini',
    },
    {
      id: 'alzheimer-s-disease',
      group: 'tag',
      label: '#alzheimer-s-disease',
    },
    {
      id: 'amazon',
      group: 'tag',
      label: '#amazon',
    },
    {
      id: 'anchoring-bias',
      group: 'tag',
      label: '#anchoring-bias',
    },
    {
      id: 'andreas-reuter',
      group: 'tag',
      label: '#andreas-reuter',
    },
    {
      id: 'andrew-h-hales',
      group: 'tag',
      label: '#andrew-h-hales',
    },
    {
      id: 'andy-rachleff',
      group: 'tag',
      label: '#andy-rachleff',
    },
    {
      id: 'anxiety',
      group: 'tag',
      label: '#anxiety',
    },
    {
      id: 'aphantasia',
      group: 'tag',
      label: '#aphantasia',
    },
    {
      id: 'apple',
      group: 'tag',
      label: '#apple',
    },
    {
      id: 'architecture',
      group: 'tag',
      label: '#architecture',
    },
    {
      id: 'atlantic-richfield',
      group: 'tag',
      label: '#atlantic-richfield',
    },
    {
      id: 'beliefs',
      group: 'tag',
      label: '#beliefs',
    },
    {
      id: 'benjamin-a-converse',
      group: 'tag',
      label: '#benjamin-a-converse',
    },
    {
      id: 'benjamin-franklin',
      group: 'tag',
      label: '#benjamin-franklin',
    },
    {
      id: 'bike-shedding',
      group: 'tag',
      label: '#bike-shedding',
    },
    {
      id: 'bimodal-sleep',
      group: 'tag',
      label: '#bimodal-sleep',
    },
    {
      id: 'biochemical',
      group: 'tag',
      label: '#biochemical',
    },
    {
      id: 'biology',
      group: 'tag',
      label: '#biology',
    },
    {
      id: 'bitcoin',
      group: 'tag',
      label: '#bitcoin',
    },
    {
      id: 'blockchain',
      group: 'tag',
      label: '#blockchain',
    },
    {
      id: 'body',
      group: 'tag',
      label: '#body',
    },
    {
      id: 'brain',
      group: 'tag',
      label: '#brain',
    },
    {
      id: 'brainstorming',
      group: 'tag',
      label: '#brainstorming',
    },
    {
      id: 'branding',
      group: 'tag',
      label: '#branding',
    },
    {
      id: 'brandolini-s-law',
      group: 'tag',
      label: '#brandolini-s-law',
    },
    {
      id: 'bureaucracy',
      group: 'tag',
      label: '#bureaucracy',
    },
    {
      id: 'business',
      group: 'tag',
      label: '#business',
    },
    {
      id: 'business-agility',
      group: 'tag',
      label: '#business-agility',
    },
    {
      id: 'business-roles',
      group: 'tag',
      label: '#business-roles',
    },
    {
      id: 'calculus',
      group: 'tag',
      label: '#calculus',
    },
    {
      id: 'carbohydrates',
      group: 'tag',
      label: '#carbohydrates',
    },
    {
      id: 'ceo',
      group: 'tag',
      label: '#ceo',
    },
    {
      id: 'chakra',
      group: 'tag',
      label: '#chakra',
    },
    {
      id: 'charles-goodhart',
      group: 'tag',
      label: '#charles-goodhart',
    },
    {
      id: 'chemistry',
      group: 'tag',
      label: '#chemistry',
    },
    {
      id: 'chunking',
      group: 'tag',
      label: '#chunking',
    },
    {
      id: 'cia',
      group: 'tag',
      label: '#cia',
    },
    {
      id: 'circle-of-competence',
      group: 'tag',
      label: '#circle-of-competence',
    },
    {
      id: 'cognitive-bias',
      group: 'tag',
      label: '#cognitive-bias',
    },
    {
      id: 'cognitive-biases',
      group: 'tag',
      label: '#cognitive-biases',
    },
    {
      id: 'communication',
      group: 'tag',
      label: '#communication',
    },
    {
      id: 'computer-science',
      group: 'tag',
      label: '#computer-science',
    },
    {
      id: 'computing',
      group: 'tag',
      label: '#computing',
    },
    {
      id: 'confirmation-bias',
      group: 'tag',
      label: '#confirmation-bias',
    },
    {
      id: 'conflict-resolution',
      group: 'tag',
      label: '#conflict-resolution',
    },
    {
      id: 'context-switching',
      group: 'tag',
      label: '#context-switching',
    },
    {
      id: 'coo',
      group: 'tag',
      label: '#coo',
    },
    {
      id: 'copywriting',
      group: 'tag',
      label: '#copywriting',
    },
    {
      id: 'cost-of-delay',
      group: 'tag',
      label: '#cost-of-delay',
    },
    {
      id: 'creativity',
      group: 'tag',
      label: '#creativity',
    },
    {
      id: 'critical-fractile',
      group: 'tag',
      label: '#critical-fractile',
    },
    {
      id: 'critical-path',
      group: 'tag',
      label: '#critical-path',
    },
    {
      id: 'cryptocurrencies',
      group: 'tag',
      label: '#cryptocurrencies',
    },
    {
      id: 'cryptography',
      group: 'tag',
      label: '#cryptography',
    },
    {
      id: 'csd-matrix',
      group: 'tag',
      label: '#csd-matrix',
    },
    {
      id: 'culture',
      group: 'tag',
      label: '#culture',
    },
    {
      id: 'cumulative-flow-diagram',
      group: 'tag',
      label: '#cumulative-flow-diagram',
    },
    {
      id: 'customer-support',
      group: 'tag',
      label: '#customer-support',
    },
    {
      id: 'customers',
      group: 'tag',
      label: '#customers',
    },
    {
      id: 'cycle-time',
      group: 'tag',
      label: '#cycle-time',
    },
    {
      id: 'cynthia-dwork',
      group: 'tag',
      label: '#cynthia-dwork',
    },
    {
      id: 'dan-s-kennedy',
      group: 'tag',
      label: '#dan-s-kennedy',
    },
    {
      id: 'data-driven',
      group: 'tag',
      label: '#data-driven',
    },
    {
      id: 'database',
      group: 'tag',
      label: '#database',
    },
    {
      id: 'david-dunning',
      group: 'tag',
      label: '#david-dunning',
    },
    {
      id: 'david-kendall',
      group: 'tag',
      label: '#david-kendall',
    },
    {
      id: 'decision-making',
      group: 'tag',
      label: '#decision-making',
    },
    {
      id: 'delayed-return-environment',
      group: 'tag',
      label: '#delayed-return-environment',
    },
    {
      id: 'depression',
      group: 'tag',
      label: '#depression',
    },
    {
      id: 'design',
      group: 'tag',
      label: '#design',
    },
    {
      id: 'design-system',
      group: 'tag',
      label: '#design-system',
    },
    {
      id: 'design-thinking',
      group: 'tag',
      label: '#design-thinking',
    },
    {
      id: 'determinism',
      group: 'tag',
      label: '#determinism',
    },
    {
      id: 'diffusion-of-innovations',
      group: 'tag',
      label: '#diffusion-of-innovations',
    },
    {
      id: 'digital-content',
      group: 'tag',
      label: '#digital-content',
    },
    {
      id: 'digital-marketing',
      group: 'tag',
      label: '#digital-marketing',
    },
    {
      id: 'direction',
      group: 'tag',
      label: '#direction',
    },
    {
      id: 'distribution-channel',
      group: 'tag',
      label: '#distribution-channel',
    },
    {
      id: 'dopamine',
      group: 'tag',
      label: '#dopamine',
    },
    {
      id: 'dunning-kruger-effect',
      group: 'tag',
      label: '#dunning-kruger-effect',
    },
    {
      id: 'e-st-elmo-lewis',
      group: 'tag',
      label: '#e-st-elmo-lewis',
    },
    {
      id: 'economic-framework',
      group: 'tag',
      label: '#economic-framework',
    },
    {
      id: 'economics',
      group: 'tag',
      label: '#economics',
    },
    {
      id: 'education',
      group: 'tag',
      label: '#education',
    },
    {
      id: 'efficiency',
      group: 'tag',
      label: '#efficiency',
    },
    {
      id: 'electronic-circuits',
      group: 'tag',
      label: '#electronic-circuits',
    },
    {
      id: 'emotions',
      group: 'tag',
      label: '#emotions',
    },
    {
      id: 'endocrine-system',
      group: 'tag',
      label: '#endocrine-system',
    },
    {
      id: 'energy',
      group: 'tag',
      label: '#energy',
    },
    {
      id: 'engineering',
      group: 'tag',
      label: '#engineering',
    },
    {
      id: 'entrepreneurship',
      group: 'tag',
      label: '#entrepreneurship',
    },
    {
      id: 'environment',
      group: 'tag',
      label: '#environment',
    },
    {
      id: 'ethics',
      group: 'tag',
      label: '#ethics',
    },
    {
      id: 'ethos',
      group: 'tag',
      label: '#ethos',
    },
    {
      id: 'event-driven',
      group: 'tag',
      label: '#event-driven',
    },
    {
      id: 'facebook',
      group: 'tag',
      label: '#facebook',
    },
    {
      id: 'fake-news',
      group: 'tag',
      label: '#fake-news',
    },
    {
      id: 'feynman-technique',
      group: 'tag',
      label: '#feynman-technique',
    },
    {
      id: 'finances',
      group: 'tag',
      label: '#finances',
    },
    {
      id: 'first-principles-thinking',
      group: 'tag',
      label: '#first-principles-thinking',
    },
    {
      id: 'flow-state',
      group: 'tag',
      label: '#flow-state',
    },
    {
      id: 'focus',
      group: 'tag',
      label: '#focus',
    },
    {
      id: 'gabrielle-s-adams',
      group: 'tag',
      label: '#gabrielle-s-adams',
    },
    {
      id: 'genetics',
      group: 'tag',
      label: '#genetics',
    },
    {
      id: 'getting-things-done',
      group: 'tag',
      label: '#getting-things-done',
    },
    {
      id: 'glucose',
      group: 'tag',
      label: '#glucose',
    },
    {
      id: 'goodhart-s-law',
      group: 'tag',
      label: '#goodhart-s-law',
    },
    {
      id: 'gordon-e-moore',
      group: 'tag',
      label: '#gordon-e-moore',
    },
    {
      id: 'government',
      group: 'tag',
      label: '#government',
    },
    {
      id: 'grammar',
      group: 'tag',
      label: '#grammar',
    },
    {
      id: 'gravitational-force',
      group: 'tag',
      label: '#gravitational-force',
    },
    {
      id: 'groupthink',
      group: 'tag',
      label: '#groupthink',
    },
    {
      id: 'gulf-of-mexico',
      group: 'tag',
      label: '#gulf-of-mexico',
    },
    {
      id: 'habits',
      group: 'tag',
      label: '#habits',
    },
    {
      id: 'happiness',
      group: 'tag',
      label: '#happiness',
    },
    {
      id: 'healthy',
      group: 'tag',
      label: '#healthy',
    },
    {
      id: 'hermann-ebbinghaus',
      group: 'tag',
      label: '#hermann-ebbinghaus',
    },
    {
      id: 'hermann-von-helmholtz',
      group: 'tag',
      label: '#hermann-von-helmholtz',
    },
    {
      id: 'heuristic',
      group: 'tag',
      label: '#heuristic',
    },
    {
      id: 'heuristics',
      group: 'tag',
      label: '#heuristics',
    },
    {
      id: 'high-state-queues',
      group: 'tag',
      label: '#high-state-queues',
    },
    {
      id: 'hinduism',
      group: 'tag',
      label: '#hinduism',
    },
    {
      id: 'hormones',
      group: 'tag',
      label: '#hormones',
    },
    {
      id: 'human-behavior',
      group: 'tag',
      label: '#human-behavior',
    },
    {
      id: 'human-connection',
      group: 'tag',
      label: '#human-connection',
    },
    {
      id: 'human-resources',
      group: 'tag',
      label: '#human-resources',
    },
    {
      id: 'humours',
      group: 'tag',
      label: '#humours',
    },
    {
      id: 'hydraulic-engineering',
      group: 'tag',
      label: '#hydraulic-engineering',
    },
    {
      id: 'hyperbolic-discounting',
      group: 'tag',
      label: '#hyperbolic-discounting',
    },
    {
      id: 'hyperbolic-trigonometry',
      group: 'tag',
      label: '#hyperbolic-trigonometry',
    },
    {
      id: 'hypotheses',
      group: 'tag',
      label: '#hypotheses',
    },
    {
      id: 'immediate-return-environment',
      group: 'tag',
      label: '#immediate-return-environment',
    },
    {
      id: 'india',
      group: 'tag',
      label: '#india',
    },
    {
      id: 'inductive-reasoning',
      group: 'tag',
      label: '#inductive-reasoning',
    },
    {
      id: 'inflation',
      group: 'tag',
      label: '#inflation',
    },
    {
      id: 'information-processing',
      group: 'tag',
      label: '#information-processing',
    },
    {
      id: 'information-processing-metaphor',
      group: 'tag',
      label: '#information-processing-metaphor',
    },
    {
      id: 'innovation',
      group: 'tag',
      label: '#innovation',
    },
    {
      id: 'insomnia',
      group: 'tag',
      label: '#insomnia',
    },
    {
      id: 'insulin',
      group: 'tag',
      label: '#insulin',
    },
    {
      id: 'intelligence',
      group: 'tag',
      label: '#intelligence',
    },
    {
      id: 'internet',
      group: 'tag',
      label: '#internet',
    },
    {
      id: 'inventory',
      group: 'tag',
      label: '#inventory',
    },
    {
      id: 'investment',
      group: 'tag',
      label: '#investment',
    },
    {
      id: 'job-batching',
      group: 'tag',
      label: '#job-batching',
    },
    {
      id: 'john-d-c-little',
      group: 'tag',
      label: '#john-d-c-little',
    },
    {
      id: 'journal',
      group: 'tag',
      label: '#journal',
    },
    {
      id: 'justin-kruger',
      group: 'tag',
      label: '#justin-kruger',
    },
    {
      id: 'kanban',
      group: 'tag',
      label: '#kanban',
    },
    {
      id: 'kendal-notation',
      group: 'tag',
      label: '#kendal-notation',
    },
    {
      id: 'kevin-kelly',
      group: 'tag',
      label: '#kevin-kelly',
    },
    {
      id: 'key-value-database',
      group: 'tag',
      label: '#key-value-database',
    },
    {
      id: 'knowledge',
      group: 'tag',
      label: '#knowledge',
    },
    {
      id: 'last-mile',
      group: 'tag',
      label: '#last-mile',
    },
    {
      id: 'last-mile-problem',
      group: 'tag',
      label: '#last-mile-problem',
    },
    {
      id: 'lay-of-the-vital-few',
      group: 'tag',
      label: '#lay-of-the-vital-few',
    },
    {
      id: 'leadership',
      group: 'tag',
      label: '#leadership',
    },
    {
      id: 'lean',
      group: 'tag',
      label: '#lean',
    },
    {
      id: 'learning',
      group: 'tag',
      label: '#learning',
    },
    {
      id: 'learning-in-public',
      group: 'tag',
      label: '#learning-in-public',
    },
    {
      id: 'leidy-e-klotz',
      group: 'tag',
      label: '#leidy-e-klotz',
    },
    {
      id: 'linear-algebra',
      group: 'tag',
      label: '#linear-algebra',
    },
    {
      id: 'liver',
      group: 'tag',
      label: '#liver',
    },
    {
      id: 'logic',
      group: 'tag',
      label: '#logic',
    },
    {
      id: 'logistics',
      group: 'tag',
      label: '#logistics',
    },
    {
      id: 'loneliness',
      group: 'tag',
      label: '#loneliness',
    },
    {
      id: 'long-term-memory',
      group: 'tag',
      label: '#long-term-memory',
    },
    {
      id: 'long-term-success',
      group: 'tag',
      label: '#long-term-success',
    },
    {
      id: 'luck',
      group: 'tag',
      label: '#luck',
    },
    {
      id: 'macroeconomics',
      group: 'tag',
      label: '#macroeconomics',
    },
    {
      id: 'management',
      group: 'tag',
      label: '#management',
    },
    {
      id: 'manufacturing',
      group: 'tag',
      label: '#manufacturing',
    },
    {
      id: 'marc-andreesen',
      group: 'tag',
      label: '#marc-andreesen',
    },
    {
      id: 'mark-twain',
      group: 'tag',
      label: '#mark-twain',
    },
    {
      id: 'market',
      group: 'tag',
      label: '#market',
    },
    {
      id: 'marketing',
      group: 'tag',
      label: '#marketing',
    },
    {
      id: 'markets',
      group: 'tag',
      label: '#markets',
    },
    {
      id: 'math',
      group: 'tag',
      label: '#math',
    },
    {
      id: 'matrix',
      group: 'tag',
      label: '#matrix',
    },
    {
      id: 'maxwell-maltz',
      group: 'tag',
      label: '#maxwell-maltz',
    },
    {
      id: 'meditation',
      group: 'tag',
      label: '#meditation',
    },
    {
      id: 'memory',
      group: 'tag',
      label: '#memory',
    },
    {
      id: 'mental-models',
      group: 'tag',
      label: '#mental-models',
    },
    {
      id: 'metrics',
      group: 'tag',
      label: '#metrics',
    },
    {
      id: 'microeconomics',
      group: 'tag',
      label: '#microeconomics',
    },
    {
      id: 'microsoft',
      group: 'tag',
      label: '#microsoft',
    },
    {
      id: 'mihaly-csikszentmihalyi',
      group: 'tag',
      label: '#mihaly-csikszentmihalyi',
    },
    {
      id: 'mind',
      group: 'tag',
      label: '#mind',
    },
    {
      id: 'mindfulness',
      group: 'tag',
      label: '#mindfulness',
    },
    {
      id: 'mission',
      group: 'tag',
      label: '#mission',
    },
    {
      id: 'modern-society',
      group: 'tag',
      label: '#modern-society',
    },
    {
      id: 'money',
      group: 'tag',
      label: '#money',
    },
    {
      id: 'money-supply',
      group: 'tag',
      label: '#money-supply',
    },
    {
      id: 'moni-namor',
      group: 'tag',
      label: '#moni-namor',
    },
    {
      id: 'moore-s-law',
      group: 'tag',
      label: '#moore-s-law',
    },
    {
      id: 'motivation',
      group: 'tag',
      label: '#motivation',
    },
    {
      id: 'multisensory',
      group: 'tag',
      label: '#multisensory',
    },
    {
      id: 'multitasking',
      group: 'tag',
      label: '#multitasking',
    },
    {
      id: 'music',
      group: 'tag',
      label: '#music',
    },
    {
      id: 'my-story',
      group: 'tag',
      label: '#my-story',
    },
    {
      id: 'natural-planning-model',
      group: 'tag',
      label: '#natural-planning-model',
    },
    {
      id: 'network',
      group: 'tag',
      label: '#network',
    },
    {
      id: 'network-effect',
      group: 'tag',
      label: '#network-effect',
    },
    {
      id: 'network-effects',
      group: 'tag',
      label: '#network-effects',
    },
    {
      id: 'neurotransmitter',
      group: 'tag',
      label: '#neurotransmitter',
    },
    {
      id: 'newsletter',
      group: 'tag',
      label: '#newsletter',
    },
    {
      id: 'nick-szabo',
      group: 'tag',
      label: '#nick-szabo',
    },
    {
      id: 'nosql',
      group: 'tag',
      label: '#nosql',
    },
    {
      id: 'operations',
      group: 'tag',
      label: '#operations',
    },
    {
      id: 'opportunity-cost',
      group: 'tag',
      label: '#opportunity-cost',
    },
    {
      id: 'optimization',
      group: 'tag',
      label: '#optimization',
    },
    {
      id: 'organic-social-media',
      group: 'tag',
      label: '#organic-social-media',
    },
    {
      id: 'ownership',
      group: 'tag',
      label: '#ownership',
    },
    {
      id: 'paid-product-distribution',
      group: 'tag',
      label: '#paid-product-distribution',
    },
    {
      id: 'paid-social-media',
      group: 'tag',
      label: '#paid-social-media',
    },
    {
      id: 'pareto-principle',
      group: 'tag',
      label: '#pareto-principle',
    },
    {
      id: 'parkinson-s-law',
      group: 'tag',
      label: '#parkinson-s-law',
    },
    {
      id: 'partnerships',
      group: 'tag',
      label: '#partnerships',
    },
    {
      id: 'personas',
      group: 'tag',
      label: '#personas',
    },
    {
      id: 'philosophy',
      group: 'tag',
      label: '#philosophy',
    },
    {
      id: 'phonological-loop',
      group: 'tag',
      label: '#phonological-loop',
    },
    {
      id: 'physics',
      group: 'tag',
      label: '#physics',
    },
    {
      id: 'pioneer-square-labs',
      group: 'tag',
      label: '#pioneer-square-labs',
    },
    {
      id: 'planning',
      group: 'tag',
      label: '#planning',
    },
    {
      id: 'pricing',
      group: 'tag',
      label: '#pricing',
    },
    {
      id: 'principles',
      group: 'tag',
      label: '#principles',
    },
    {
      id: 'problem-solving',
      group: 'tag',
      label: '#problem-solving',
    },
    {
      id: 'procrastination',
      group: 'tag',
      label: '#procrastination',
    },
    {
      id: 'product',
      group: 'tag',
      label: '#product',
    },
    {
      id: 'product-development',
      group: 'tag',
      label: '#product-development',
    },
    {
      id: 'product-management',
      group: 'tag',
      label: '#product-management',
    },
    {
      id: 'product-manager',
      group: 'tag',
      label: '#product-manager',
    },
    {
      id: 'product-strategy',
      group: 'tag',
      label: '#product-strategy',
    },
    {
      id: 'productivity',
      group: 'tag',
      label: '#productivity',
    },
    {
      id: 'profitability',
      group: 'tag',
      label: '#profitability',
    },
    {
      id: 'project-management',
      group: 'tag',
      label: '#project-management',
    },
    {
      id: 'proprietary-product-distribution',
      group: 'tag',
      label: '#proprietary-product-distribution',
    },
    {
      id: 'proxy',
      group: 'tag',
      label: '#proxy',
    },
    {
      id: 'psychological-trigger',
      group: 'tag',
      label: '#psychological-trigger',
    },
    {
      id: 'psychological-triggers',
      group: 'tag',
      label: '#psychological-triggers',
    },
    {
      id: 'psychology',
      group: 'tag',
      label: '#psychology',
    },
    {
      id: 'pull-principle',
      group: 'tag',
      label: '#pull-principle',
    },
    {
      id: 'push-principle',
      group: 'tag',
      label: '#push-principle',
    },
    {
      id: 'queueing-theory',
      group: 'tag',
      label: '#queueing-theory',
    },
    {
      id: 'reactive-planning-model',
      group: 'tag',
      label: '#reactive-planning-model',
    },
    {
      id: 'reading',
      group: 'tag',
      label: '#reading',
    },
    {
      id: 'reading-metacognitively',
      group: 'tag',
      label: '#reading-metacognitively',
    },
    {
      id: 'recruiting',
      group: 'tag',
      label: '#recruiting',
    },
    {
      id: 'resources',
      group: 'tag',
      label: '#resources',
    },
    {
      id: 'rhetorical-triangle',
      group: 'tag',
      label: '#rhetorical-triangle',
    },
    {
      id: 'richard-atkinson',
      group: 'tag',
      label: '#richard-atkinson',
    },
    {
      id: 'richard-feynman',
      group: 'tag',
      label: '#richard-feynman',
    },
    {
      id: 'richard-shiffrin',
      group: 'tag',
      label: '#richard-shiffrin',
    },
    {
      id: 'risks',
      group: 'tag',
      label: '#risks',
    },
    {
      id: 'robert-b-cialdini',
      group: 'tag',
      label: '#robert-b-cialdini',
    },
    {
      id: 'rocket-internet',
      group: 'tag',
      label: '#rocket-internet',
    },
    {
      id: 'sales',
      group: 'tag',
      label: '#sales',
    },
    {
      id: 'scientific-method',
      group: 'tag',
      label: '#scientific-method',
    },
    {
      id: 'scrum',
      group: 'tag',
      label: '#scrum',
    },
    {
      id: 'scrum-master',
      group: 'tag',
      label: '#scrum-master',
    },
    {
      id: 'selling',
      group: 'tag',
      label: '#selling',
    },
    {
      id: 'semiconductors',
      group: 'tag',
      label: '#semiconductors',
    },
    {
      id: 'short-term-memory',
      group: 'tag',
      label: '#short-term-memory',
    },
    {
      id: 'shreyas-doshi',
      group: 'tag',
      label: '#shreyas-doshi',
    },
    {
      id: 'slack',
      group: 'tag',
      label: '#slack',
    },
    {
      id: 'sleep',
      group: 'tag',
      label: '#sleep',
    },
    {
      id: 'sleep-two-shifts',
      group: 'tag',
      label: '#sleep-two-shifts',
    },
    {
      id: 'smart-contracts',
      group: 'tag',
      label: '#smart-contracts',
    },
    {
      id: 'social-media',
      group: 'tag',
      label: '#social-media',
    },
    {
      id: 'social-network',
      group: 'tag',
      label: '#social-network',
    },
    {
      id: 'sociology',
      group: 'tag',
      label: '#sociology',
    },
    {
      id: 'software-development',
      group: 'tag',
      label: '#software-development',
    },
    {
      id: 'software-engineering',
      group: 'tag',
      label: '#software-engineering',
    },
    {
      id: 'solar-power-generation',
      group: 'tag',
      label: '#solar-power-generation',
    },
    {
      id: 'stakeholders',
      group: 'tag',
      label: '#stakeholders',
    },
    {
      id: 'startup',
      group: 'tag',
      label: '#startup',
    },
    {
      id: 'startup-accelerator',
      group: 'tag',
      label: '#startup-accelerator',
    },
    {
      id: 'startup-incubator',
      group: 'tag',
      label: '#startup-incubator',
    },
    {
      id: 'startup-metrics',
      group: 'tag',
      label: '#startup-metrics',
    },
    {
      id: 'startup-studio',
      group: 'tag',
      label: '#startup-studio',
    },
    {
      id: 'startups',
      group: 'tag',
      label: '#startups',
    },
    {
      id: 'statistics',
      group: 'tag',
      label: '#statistics',
    },
    {
      id: 'status',
      group: 'tag',
      label: '#status',
    },
    {
      id: 'strategic-decisions',
      group: 'tag',
      label: '#strategic-decisions',
    },
    {
      id: 'strategy',
      group: 'tag',
      label: '#strategy',
    },
    {
      id: 'stress',
      group: 'tag',
      label: '#stress',
    },
    {
      id: 'structured-thinking',
      group: 'tag',
      label: '#structured-thinking',
    },
    {
      id: 'sugar',
      group: 'tag',
      label: '#sugar',
    },
    {
      id: 'sunk-cost',
      group: 'tag',
      label: '#sunk-cost',
    },
    {
      id: 'swot-analysis',
      group: 'tag',
      label: '#swot-analysis',
    },
    {
      id: 'taiich-ohno',
      group: 'tag',
      label: '#taiich-ohno',
    },
    {
      id: 'target-market',
      group: 'tag',
      label: '#target-market',
    },
    {
      id: 'technology',
      group: 'tag',
      label: '#technology',
    },
    {
      id: 'techstars',
      group: 'tag',
      label: '#techstars',
    },
    {
      id: 'telecommunications',
      group: 'tag',
      label: '#telecommunications',
    },
    {
      id: 'telegraph',
      group: 'tag',
      label: '#telegraph',
    },
    {
      id: 'the-7-habits-of-highly-effective-people',
      group: 'tag',
      label: '#the-7-habits-of-highly-effective-people',
    },
    {
      id: 'the-pyramid-principle',
      group: 'tag',
      label: '#the-pyramid-principle',
    },
    {
      id: 'the-unfair-advantage',
      group: 'tag',
      label: '#the-unfair-advantage',
    },
    {
      id: 'theo-harder',
      group: 'tag',
      label: '#theo-harder',
    },
    {
      id: 'theory-of-constraints',
      group: 'tag',
      label: '#theory-of-constraints',
    },
    {
      id: 'think-and-grow-rich',
      group: 'tag',
      label: '#think-and-grow-rich',
    },
    {
      id: 'thinking',
      group: 'tag',
      label: '#thinking',
    },
    {
      id: 'thomas-hobbes',
      group: 'tag',
      label: '#thomas-hobbes',
    },
    {
      id: 'time',
      group: 'tag',
      label: '#time',
    },
    {
      id: 'time-management',
      group: 'tag',
      label: '#time-management',
    },
    {
      id: 'time-to-market',
      group: 'tag',
      label: '#time-to-market',
    },
    {
      id: 'tom-cargill',
      group: 'tag',
      label: '#tom-cargill',
    },
    {
      id: 'toyota',
      group: 'tag',
      label: '#toyota',
    },
    {
      id: 'toyota-production-system',
      group: 'tag',
      label: '#toyota-production-system',
    },
    {
      id: 'transistors',
      group: 'tag',
      label: '#transistors',
    },
    {
      id: 'twitter',
      group: 'tag',
      label: '#twitter',
    },
    {
      id: 'two-phase-sleep',
      group: 'tag',
      label: '#two-phase-sleep',
    },
    {
      id: 'ui',
      group: 'tag',
      label: '#ui',
    },
    {
      id: 'ui-driven',
      group: 'tag',
      label: '#ui-driven',
    },
    {
      id: 'user-experience',
      group: 'tag',
      label: '#user-experience',
    },
    {
      id: 'user-interface',
      group: 'tag',
      label: '#user-interface',
    },
    {
      id: 'value-proposition',
      group: 'tag',
      label: '#value-proposition',
    },
    {
      id: 'values',
      group: 'tag',
      label: '#values',
    },
    {
      id: 'variance',
      group: 'tag',
      label: '#variance',
    },
    {
      id: 'venture-building',
      group: 'tag',
      label: '#venture-building',
    },
    {
      id: 'venture-capital',
      group: 'tag',
      label: '#venture-capital',
    },
    {
      id: 'vilfredo-pareto',
      group: 'tag',
      label: '#vilfredo-pareto',
    },
    {
      id: 'vision',
      group: 'tag',
      label: '#vision',
    },
    {
      id: 'visuospatial-sketchpad',
      group: 'tag',
      label: '#visuospatial-sketchpad',
    },
    {
      id: 'walter-cannon',
      group: 'tag',
      label: '#walter-cannon',
    },
    {
      id: 'web-applications',
      group: 'tag',
      label: '#web-applications',
    },
    {
      id: 'work-in-process',
      group: 'tag',
      label: '#work-in-process',
    },
    {
      id: 'work-in-progress',
      group: 'tag',
      label: '#work-in-progress',
    },
    {
      id: 'working-memory',
      group: 'tag',
      label: '#working-memory',
    },
    {
      id: 'workout',
      group: 'tag',
      label: '#workout',
    },
    {
      id: 'writing',
      group: 'tag',
      label: '#writing',
    },
    {
      id: 'y-combinator',
      group: 'tag',
      label: '#y-combinator',
    },
    {
      id: 'zettelkasten',
      group: 'tag',
      label: '#zettelkasten',
    },
    {
      id: 'zombie-projects',
      group: 'tag',
      label: '#zombie-projects',
    },
  ],
  links: [
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source:
        '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: '/zettel/control-wip-by-shedding-requirements',
    },
    {
      target:
        '/zettel/identify-in-advance-which-requirements-you-would-consider-eliminating-or-relaxing',
      source: '/zettel/control-wip-by-shedding-requirements',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: '/zettel/when-wip-is-high-purge-low-value-projects',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: '/zettel/chief-executive-officer-ceo',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: '/zettel/factors-to-consider-when-making-a-strategic-decision',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: '/zettel/operations-departments-of-a-tech-company',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
    },
    {
      target: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      source: '/zettel/swot-analysis',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
    },
    {
      target: '/zettel/when-wip-is-high-purge-low-value-projects',
      source:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
    },
    {
      target: '/zettel/zombie-projects',
      source:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: '/zettel/block-all-demand-when-wip-reaches-its-upper-limit',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: '/zettel/economic-waste-that-queues-create',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
    },
    {
      target: '/zettel/block-all-demand-when-wip-reaches-its-upper-limit',
      source:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: '/zettel/product-strategy-roadmap',
    },
    {
      target: '/zettel/product-strategy',
      source: '/zettel/product-strategy-roadmap',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: '/zettel/product-strategy-tools',
    },
    {
      target: '/zettel/product-strategy',
      source: '/zettel/product-strategy-tools',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: '/zettel/product-strategy',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: '/zettel/kanban-pull-principle',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: '/zettel/kanban-pull-principle',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: '/zettel/kanban-pull-principle',
    },
    {
      target: '/zettel/kanban',
      source: '/zettel/kanban-pull-principle',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: '/zettel/cross-functional-team',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: '/zettel/theory-of-constraints-toc-elevating-the-constraint',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: '/zettel/theory-of-constraints-toc',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source:
        '/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods',
    },
    {
      target: '/zettel/small-batch-size-activities-increase-trust',
      source: '/zettel/social-expectancy-theory',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: '/zettel/queues-in-product-development',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: '/zettel/kanban',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: '/zettel/kanban',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: '/zettel/kanban',
    },
    {
      target: '/zettel/queues-in-product-development',
      source: '/zettel/kanban',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source: '/zettel/work-in-process-wip',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/zombie-projects',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes',
      source: '/zettel/work-in-process-wip',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: '/zettel/work-in-process-wip',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: '/zettel/work-in-process-wip',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/queues-in-product-development',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/kanban',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/zettel/flow-efficiency',
      source: '/zettel/work-in-process-wip',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/first-principles-thinking',
    },
    {
      target: '/zettel/personas',
      source: '/zettel/value-proposition',
    },
    {
      target: '/great-good-okay-and-bad-product-managers',
      source: '/zettel/ethos',
    },
    {
      target:
        '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: '/zettel/cycle-time',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: '/zettel/cycle-time',
    },
    {
      target: '/zettel/flow-efficiency',
      source: '/zettel/cycle-time',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: '/zettel/cost-of-delay',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: '/zettel/cost-of-delay',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: '/zettel/business-agility',
    },
    {
      target: '/zettel/cycle-time',
      source: '/zettel/business-agility',
    },
    {
      target: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      source: '/zettel/product-management',
    },
    {
      target: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      source: '/zettel/product-manager',
    },
    {
      target: '/zettel/product-owner',
      source: '/zettel/product-manager',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: '/zettel/product-manager',
    },
    {
      target: '/zettel/startup-founding-team-roles',
      source: '/zettel/startup-ceo',
    },
    {
      target: '/zettel/startup-ceo',
      source: '/zettel/startup-co-ce-os-problems',
    },
    {
      target: '/zettel/operating-outside-a-circle-of-competence',
      source: '/zettel/circle-of-competence',
    },
    {
      target: '/zettel/building-and-maintaining-a-circle-of-competence',
      source: '/zettel/circle-of-competence',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: '/zettel/little-s-law',
    },
    {
      target: '/zettel/cycle-time',
      source: '/zettel/little-s-law',
    },
    {
      target: '/zettel/scrum',
      source: '/zettel/scrum-master',
    },
    {
      target: '/zettel/agile',
      source: '/zettel/twelve-principles-of-agile-software',
    },
    {
      target: '/five-habits-for-the-next-five-years-first-year',
      source: '/meditation-roadmap',
    },
    {
      target: '/meditation-roadmap',
      source: '/zettel/phonological-loop',
    },
    {
      target: '/meditation-roadmap',
      source: '/zettel/visuospatial-sketchpad',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: '/what-are-mission-vision-and-values',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: '/what-are-mission-vision-and-values',
    },
    {
      target: '/zettel/exponential-technology',
      source: '/zettel/moore-s-law',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: '/zettel/network-effects',
    },
    {
      target: '/zettel/endocrine-glands-and-chakras-correlation',
      source: '/zettel/base-chakra',
    },
    {
      target: '/newsletter-v1',
      source: '/zettel/hormones',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/theory-of-constraints-toc-elevating-the-constraint',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: '/zettel/queue-capacity-utilization',
    },
    {
      target: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      source: '/zettel/queue-service-process',
    },
    {
      target: '/zettel/queue-capacity-utilization',
      source: '/zettel/queue-service-process',
    },
    {
      target: '/zettel/queueing-theory',
      source: '/zettel/queue-service-process',
    },
    {
      target: '/zettel/mental-models-overcome-cognitive-biases',
      source: '/zettel/cognitive-bias',
    },
    {
      target: '/zettel/building-and-maintaining-a-circle-of-competence',
      source: '/zettel/cognitive-bias',
    },
    {
      target: '/zettel/functional-fixedness',
      source: '/zettel/cognitive-bias',
    },
    {
      target: '/zettel/anecdotal-evidence',
      source: '/zettel/cognitive-bias',
    },
    {
      target: '/zettel/dunning-kruger-effect',
      source: '/zettel/cognitive-bias',
    },
    {
      target: '/zettel/anecdotal-evidence',
      source: '/zettel/inductive-argument',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: '/zettel/critical-path',
    },
    {
      target: '/zettel/queue-service-process',
      source: '/zettel/markov-process',
    },
    {
      target: '/zettel/queueing-theory',
      source: '/zettel/markov-process',
    },
    {
      target: '/zettel/queues-in-product-development',
      source: '/zettel/queueing-theory',
    },
    {
      target: '/zettel/m-g-1-queue',
      source: '/zettel/queueing-theory',
    },
    {
      target: '/zettel/zombie-projects',
      source: '/zettel/sunk-cost',
    },
    {
      target: '/zettel/pareto-paradox',
      source: '/zettel/pareto-principle',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: '/zettel/natural-planning-model',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: '/zettel/reactive-planning-model',
    },
    {
      target: '/zettel/natural-planning-model',
      source: '/zettel/reactive-planning-model',
    },
    {
      target: '/newsletter-v1',
      source: '/zettel/spacing-effect-learning',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: '/zettel/opportunity-cost',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: '/zettel/context-switching',
    },
    {
      target: '/zettel/slack-and-efficiency',
      source: '/zettel/context-switching',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: '/zettel/brainstorming',
    },
    {
      target: '/zettel/natural-planning-model',
      source: '/zettel/brainstorming',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: '/zettel/brainstorming',
    },
    {
      target: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      source: '/zettel/slack-and-efficiency',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: '/zettel/slack-and-efficiency',
    },
    {
      target: '/zettel/proxy-variable',
      source: '/zettel/slack-and-efficiency',
    },
    {
      target: '/zettel/daily-scrum',
      source: '/zettel/slack-and-efficiency',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/pareto-principle',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/goodhart-s-law',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/natural-planning-model',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/the-threefold-model-for-identifying-daily-work',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/hyperbolic-discounting',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/zettel/parkinson-s-law',
      source: '/zettel/system-mental-models',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/decision-mental-models',
    },
    {
      target: '/zettel/pareto-paradox',
      source: '/zettel/decision-mental-models',
    },
    {
      target: '/zettel/radical-delegation-framework',
      source: '/zettel/decision-mental-models',
    },
    {
      target: '/zettel/natural-planning-model',
      source: '/zettel/decision-mental-models',
    },
    {
      target: '/zettel/opportunity-cost',
      source: '/zettel/decision-mental-models',
    },
    {
      target:
        '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      source: '/zettel/decision-mental-models',
    },
    {
      target: '/zettel/hyperbolic-discounting',
      source: '/zettel/decision-mental-models',
    },
    {
      target: '/zettel/spacing-effect-learning',
      source: '/zettel/long-term-memory',
    },
    {
      target: '/zettel/atkinson-shiffrin-memory-model',
      source: '/zettel/long-term-memory',
    },
    {
      target: '/zettel/short-term-memory',
      source: '/zettel/long-term-memory',
    },
    {
      target: '/zettel/reading-metacognitively',
      source: '/zettel/long-term-memory',
    },
    {
      target: '/zettel/fight-or-flight',
      source: '/zettel/short-term-memory',
    },
    {
      target: '/zettel/atkinson-shiffrin-memory-model',
      source: '/zettel/short-term-memory',
    },
    {
      target: '/zettel/chunking-and-memory',
      source: '/zettel/short-term-memory',
    },
    {
      target: '/zettel/procrastination',
      source: '/zettel/pleasure-principle-psychology',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: '/zettel/hyperbolic-discounting',
    },
    {
      target: '/zettel/mental-models-overcome-cognitive-biases',
      source: '/zettel/mental-models',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/mental-models',
    },
    {
      target:
        '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      source: '/zettel/mental-models',
    },
    {
      target: '/zettel/social-media-addiction',
      source: '/zettel/dopamine',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/social-media-addiction',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/dan-s-kennedy',
    },
    {
      target: '/zettel/venture-backable-business',
      source: '/zettel/product-market-fit',
    },
    {
      target: '/zettel/organic-social-media',
      source: '/zettel/paid-social-media',
    },
    {
      target: '/zettel/context-switching',
      source: '/zettel/human-multitasking',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/human-multitasking',
    },
    {
      target: '/zettel/startup-studio',
      source: '/zettel/startup-accelerator',
    },
    {
      target: '/zettel/startup-studio',
      source: '/zettel/venture-capital',
    },
    {
      target: '/zettel/startup-studio',
      source: '/zettel/startup-incubator',
    },
    {
      target: '/zettel/venture-building-s-startups-problems',
      source: '/zettel/startup-studio',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/proof-of-work',
    },
    {
      target: '/zettel/queues-in-product-development',
      source: '/zettel/scrum',
    },
    {
      target: '/zettel/product-owner',
      source: '/zettel/scrum',
    },
    {
      target: '/zettel/agile-methodologies',
      source: '/zettel/scrum',
    },
    {
      target: '/zettel/daily-scrum',
      source: '/zettel/scrum',
    },
    {
      target: '/zettel/inflation',
      source: '/zettel/money-supply',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: '/zettel/the-90-90-rule',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: '/zettel/last-mile-problem',
    },
    {
      target: '/skydiving-terminal-velocity',
      source: '/zettel/flow-state-psychology',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/flow-state-psychology',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: '/zettel/flow-state-psychology',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: '/zettel/flow-state-psychology',
    },
    {
      target: '/zettel/kanban',
      source: '/zettel/agile',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: '/zettel/agile',
    },
    {
      target: '/zettel/agile-methodologies',
      source: '/zettel/agile',
    },
    {
      target: '/zettel/scrum',
      source: '/zettel/agile',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: '/zettel/law-of-triviality',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: '/zettel/parkinson-s-law',
    },
    {
      target: '/zettel/ownership-may-prevent-parkinson-s-law',
      source: '/zettel/parkinson-s-law',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/parkinson-s-law',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: '/zettel/parkinson-s-law',
    },
    {
      target: '/zettel/law-of-triviality',
      source: '/zettel/parkinson-s-law',
    },
    {
      target: '/five-habits-for-the-next-five-years-first-year',
      source: '/five-habits-for-the-next-five-years',
    },
    {
      target: '/meditation-roadmap',
      source: '/five-habits-for-the-next-five-years',
    },
    {
      target: '/a-letter-to-my-friend-create',
      source: '/five-habits-for-the-next-five-years',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: '/zettel/psychological-trigger',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/reading-metacognitively',
    },
    {
      target: '/zettel/the-feynman-technique',
      source: '/zettel/reading-metacognitively',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/the-feynman-technique',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: '/zettel/zettelkasten',
    },
    {
      target:
        '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
      source: 'manufacturing',
    },
    {
      target:
        '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
      source: 'product-development',
    },
    {
      target:
        '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
      source: 'variance',
    },
    {
      target:
        '/zettel/control-wip-by-relaxing-the-targets-for-a-unit-cost-at-production',
      source: 'work-in-process',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: 'product-development',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/demand-focused-approaches-to-control-wip',
      source: 'work-in-process',
    },
    {
      target:
        '/zettel/identify-in-advance-which-requirements-you-would-consider-eliminating-or-relaxing',
      source: 'architecture',
    },
    {
      target:
        '/zettel/identify-in-advance-which-requirements-you-would-consider-eliminating-or-relaxing',
      source: 'product-development',
    },
    {
      target:
        '/zettel/identify-in-advance-which-requirements-you-would-consider-eliminating-or-relaxing',
      source: 'work-in-process',
    },
    {
      target: '/zettel/types-of-applications',
      source: 'data-driven',
    },
    {
      target: '/zettel/types-of-applications',
      source: 'event-driven',
    },
    {
      target: '/zettel/types-of-applications',
      source: 'ui',
    },
    {
      target: '/zettel/types-of-applications',
      source: 'ui-driven',
    },
    {
      target: '/zettel/types-of-applications',
      source: 'web-applications',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source: 'cycle-time',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source: 'job-batching',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/control-wip-by-shedding-requirements',
      source: 'work-in-progress',
    },
    {
      target: '/zettel/when-wip-is-high-purge-low-value-projects',
      source: 'product-development',
    },
    {
      target: '/zettel/when-wip-is-high-purge-low-value-projects',
      source: 'project-management',
    },
    {
      target: '/zettel/when-wip-is-high-purge-low-value-projects',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/anchoring-bias',
      source: 'anchoring-bias',
    },
    {
      target: '/zettel/anchoring-bias',
      source: 'cognitive-biases',
    },
    {
      target: '/zettel/anchoring-bias',
      source: 'decision-making',
    },
    {
      target: '/zettel/anchoring-bias',
      source: 'heuristics',
    },
    {
      target: '/zettel/anchoring-bias',
      source: 'information-processing',
    },
    {
      target: '/zettel/confirmation-bias',
      source: 'beliefs',
    },
    {
      target: '/zettel/confirmation-bias',
      source: 'cognitive-bias',
    },
    {
      target: '/zettel/confirmation-bias',
      source: 'confirmation-bias',
    },
    {
      target: '/zettel/confirmation-bias',
      source: 'decision-making',
    },
    {
      target: '/zettel/confirmation-bias',
      source: 'hypotheses',
    },
    {
      target: '/zettel/confirmation-bias',
      source: 'psychology',
    },
    {
      target: '/zettel/groupthink',
      source: 'decision-making',
    },
    {
      target: '/zettel/groupthink',
      source: 'groupthink',
    },
    {
      target: '/zettel/groupthink',
      source: 'psychology',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'business',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'business-roles',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'ceo',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'direction',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'long-term-success',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'stakeholders',
    },
    {
      target: '/zettel/chief-executive-officer-ceo',
      source: 'strategy',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'business',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'business-roles',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'communication',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'conflict-resolution',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'coo',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'direction',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'efficiency',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'profitability',
    },
    {
      target: '/zettel/chief-operation-officer-coo',
      source: 'strategy',
    },
    {
      target: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      source: 'business',
    },
    {
      target: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      source: 'decision-making',
    },
    {
      target: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      source: 'resources',
    },
    {
      target: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      source: 'risks',
    },
    {
      target: '/zettel/factors-to-consider-when-making-a-strategic-decision',
      source: 'stakeholders',
    },
    {
      target: '/zettel/mental-models-overcome-cognitive-biases',
      source: 'cognitive-biases',
    },
    {
      target: '/zettel/mental-models-overcome-cognitive-biases',
      source: 'mental-models',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'customer-support',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'design',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'engineering',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'marketing',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'operations',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'product',
    },
    {
      target: '/zettel/operations-departments-of-a-tech-company',
      source: 'sales',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'acquisitions',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'long-term-success',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'markets',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'partnerships',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'pricing',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'product',
    },
    {
      target:
        '/zettel/strategic-decisions-that-impact-the-company-s-long-term-success',
      source: 'strategic-decisions',
    },
    {
      target: '/zettel/swot-analysis',
      source: 'decision-making',
    },
    {
      target: '/zettel/swot-analysis',
      source: 'product-management',
    },
    {
      target: '/zettel/swot-analysis',
      source: 'swot-analysis',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: 'cost-of-delay',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: 'economic-framework',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: 'high-state-queues',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: 'queueing-theory',
    },
    {
      target:
        '/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes',
      source: 'work-in-process',
    },
    {
      target: '/zettel/zombie-projects',
      source: 'project-management',
    },
    {
      target: '/zettel/zombie-projects',
      source: 'sunk-cost',
    },
    {
      target: '/zettel/zombie-projects',
      source: 'work-in-process',
    },
    {
      target: '/zettel/zombie-projects',
      source: 'zombie-projects',
    },
    {
      target: '/zettel/startup-operations',
      source: 'customer-support',
    },
    {
      target: '/zettel/startup-operations',
      source: 'human-resources',
    },
    {
      target: '/zettel/startup-operations',
      source: 'management',
    },
    {
      target: '/zettel/startup-operations',
      source: 'marketing',
    },
    {
      target: '/zettel/startup-operations',
      source: 'product-development',
    },
    {
      target: '/zettel/startup-operations',
      source: 'startup',
    },
    {
      target: '/zettel/block-all-demand-when-wip-reaches-its-upper-limit',
      source: 'product-development',
    },
    {
      target: '/zettel/block-all-demand-when-wip-reaches-its-upper-limit',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/block-all-demand-when-wip-reaches-its-upper-limit',
      source: 'work-in-process',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: 'cost-of-delay',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: 'cycle-time',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: 'lean',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: 'product-development',
    },
    {
      target: '/zettel/economic-waste-that-queues-create',
      source: 'queueing-theory',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: 'cycle-time',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: 'product-development',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: 'queueing-theory',
    },
    {
      target:
        '/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states',
      source: 'statistics',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'amazon',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'apple',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'business',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'microsoft',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'network-effects',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'product-management',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'product-strategy',
    },
    {
      target: '/what-is-product-strategy-and-why-is-it-important',
      source: 'vision',
    },
    {
      target: '/zettel/product-strategy-roadmap',
      source: 'product-management',
    },
    {
      target: '/zettel/product-strategy-roadmap',
      source: 'product-strategy',
    },
    {
      target: '/zettel/product-strategy-tools',
      source: 'product-development',
    },
    {
      target: '/zettel/product-strategy-tools',
      source: 'product-management',
    },
    {
      target: '/zettel/product-strategy-tools',
      source: 'product-strategy',
    },
    {
      target: '/zettel/product-strategy',
      source: 'business',
    },
    {
      target: '/zettel/product-strategy',
      source: 'product-management',
    },
    {
      target: '/zettel/product-strategy',
      source: 'product-strategy',
    },
    {
      target: '/zettel/product-strategy',
      source: 'startups',
    },
    {
      target: '/zettel/product-strategy',
      source: 'target-market',
    },
    {
      target: '/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes',
      source: 'product-development',
    },
    {
      target: '/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes',
      source: 'work-in-process',
    },
    {
      target: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      source: 'product-development',
    },
    {
      target: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/slack-and-queue-capacity-utilization-are-correlated',
      source: 'slack',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: 'agile',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: 'critical-path',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: 'efficiency',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: 'product-development',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/when-response-time-is-important-measure-response-time',
      source: 'slack',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: 'kanban',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: 'product-development',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: 'queueing-theory',
    },
    {
      target:
        '/zettel/enhance-the-effectiveness-of-wip-constraints-by-cross-training-workers',
      source: 'work-in-process',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: 'kanban',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: 'product-development',
    },
    {
      target:
        '/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks',
      source: 'theory-of-constraints',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: 'kanban',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: 'product-development',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: 'pull-principle',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: 'queueing-theory',
    },
    {
      target:
        '/zettel/the-local-constraints-of-the-kanban-system-have-an-impressive-feedback-speed',
      source: 'work-in-process',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: 'kanban',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: 'product-development',
    },
    {
      target: '/zettel/kanban-uses-wip-constraints-to-control-the-cycle-time',
      source: 'toyota-production-system',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: 'agile',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: 'kanban',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: 'product-development',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: 'pull-principle',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: 'push-principle',
    },
    {
      target: '/zettel/kanban-pull-principle',
      source: 'toyota-production-system',
    },
    {
      target: '/zettel/cross-functional-team',
      source: 'business',
    },
    {
      target: '/zettel/cross-functional-team',
      source: 'engineering',
    },
    {
      target: '/zettel/cross-functional-team',
      source: 'product-development',
    },
    {
      target: '/zettel/cross-functional-team',
      source: 'startups',
    },
    {
      target: '/zettel/cross-functional-team',
      source: 'vision',
    },
    {
      target: '/zettel/theory-of-constraints-toc-elevating-the-constraint',
      source: 'product-development',
    },
    {
      target: '/zettel/theory-of-constraints-toc-elevating-the-constraint',
      source: 'productivity',
    },
    {
      target: '/zettel/theory-of-constraints-toc-elevating-the-constraint',
      source: 'theory-of-constraints',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: 'lean',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: 'product-development',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: 'project-management',
    },
    {
      target: '/zettel/theory-of-constraints-toc',
      source: 'theory-of-constraints',
    },
    {
      target: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      source: 'cycle-time',
    },
    {
      target: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/effects-of-set-a-limit-on-wip-work-in-process',
      source: 'work-in-process',
    },
    {
      target:
        '/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods',
      source: 'product-development',
    },
    {
      target:
        '/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/small-batch-size-activities-increase-trust',
      source: 'product-development',
    },
    {
      target: '/zettel/small-batch-size-activities-increase-trust',
      source: 'psychology',
    },
    {
      target: '/zettel/small-batch-size-activities-increase-trust',
      source: 'sociology',
    },
    {
      target: '/zettel/social-expectancy-theory',
      source: 'psychology',
    },
    {
      target: '/zettel/social-expectancy-theory',
      source: 'sociology',
    },
    {
      target: '/zettel/queues-in-product-development',
      source: 'product-development',
    },
    {
      target: '/zettel/queues-in-product-development',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/impact-bias',
      source: 'cognitive-bias',
    },
    {
      target: '/zettel/impact-bias',
      source: 'emotions',
    },
    {
      target: '/zettel/impact-bias',
      source: 'happiness',
    },
    {
      target: '/zettel/kanban',
      source: 'kanban',
    },
    {
      target: '/zettel/kanban',
      source: 'product-development',
    },
    {
      target: '/zettel/kanban',
      source: 'software-development',
    },
    {
      target: '/zettel/kanban',
      source: 'taiich-ohno',
    },
    {
      target: '/zettel/kanban',
      source: 'toyota-production-system',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: 'agile',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: 'cycle-time',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/work-in-process-wip',
      source: 'work-in-process',
    },
    {
      target: '/zettel/round-robin-scheduling',
      source: 'computing',
    },
    {
      target: '/zettel/round-robin-scheduling',
      source: 'queueing-theory',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: 'feynman-technique',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: 'first-principles-thinking',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: 'learning',
    },
    {
      target: '/the-feynman-mental-model-technique',
      source: 'mental-models',
    },
    {
      target: '/zettel/first-principles-thinking',
      source: 'first-principles-thinking',
    },
    {
      target: '/zettel/first-principles-thinking',
      source: 'mental-models',
    },
    {
      target: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      source: 'business',
    },
    {
      target: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      source: 'product-management',
    },
    {
      target: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      source: 'product-manager',
    },
    {
      target: '/zettel/article-the-5-dysfunctions-of-product-management-teams',
      source: 'product-strategy',
    },
    {
      target: '/great-good-okay-and-bad-product-managers',
      source: 'hypotheses',
    },
    {
      target: '/great-good-okay-and-bad-product-managers',
      source: 'product-development',
    },
    {
      target: '/great-good-okay-and-bad-product-managers',
      source: 'product-manager',
    },
    {
      target: '/great-good-okay-and-bad-product-managers',
      source: 'product-strategy',
    },
    {
      target: '/great-good-okay-and-bad-product-managers',
      source: 'shreyas-doshi',
    },
    {
      target: '/zettel/think-and-grow-rich-the-major-attributes-of-leadership',
      source: 'leadership',
    },
    {
      target: '/zettel/think-and-grow-rich-the-major-attributes-of-leadership',
      source: 'think-and-grow-rich',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'customers',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'distribution-channel',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'marketing',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'paid-product-distribution',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'product',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'proprietary-product-distribution',
    },
    {
      target: '/zettel/proprietary-product-distribution',
      source: 'startups',
    },
    {
      target: '/zettel/personas',
      source: 'personas',
    },
    {
      target: '/zettel/personas',
      source: 'product-development',
    },
    {
      target: '/zettel/value-proposition',
      source: 'branding',
    },
    {
      target: '/zettel/value-proposition',
      source: 'personas',
    },
    {
      target: '/zettel/value-proposition',
      source: 'product-development',
    },
    {
      target: '/zettel/value-proposition',
      source: 'value-proposition',
    },
    {
      target: '/zettel/ethos',
      source: 'ethics',
    },
    {
      target: '/zettel/ethos',
      source: 'ethos',
    },
    {
      target: '/zettel/ethos',
      source: 'rhetorical-triangle',
    },
    {
      target: '/zettel/ethos',
      source: 'values',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'body',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'brain',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'carbohydrates',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'glucose',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'insulin',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'liver',
    },
    {
      target: '/zettel/article-what-happens-when-you-stop-eating-all-sugar',
      source: 'sugar',
    },
    {
      target: '/zettel/flow-efficiency',
      source: 'agile',
    },
    {
      target: '/zettel/flow-efficiency',
      source: 'cycle-time',
    },
    {
      target: '/zettel/flow-efficiency',
      source: 'product-development',
    },
    {
      target: '/zettel/article-an-effortless-way-to-improve-your-memory',
      source: 'alzheimer-s-disease',
    },
    {
      target: '/zettel/article-an-effortless-way-to-improve-your-memory',
      source: 'brain',
    },
    {
      target: '/zettel/article-an-effortless-way-to-improve-your-memory',
      source: 'learning',
    },
    {
      target: '/zettel/article-an-effortless-way-to-improve-your-memory',
      source: 'memory',
    },
    {
      target: '/zettel/article-an-effortless-way-to-improve-your-memory',
      source: 'sleep',
    },
    {
      target: '/zettel/cycle-time',
      source: 'agile',
    },
    {
      target: '/zettel/cycle-time',
      source: 'business',
    },
    {
      target: '/zettel/cycle-time',
      source: 'cycle-time',
    },
    {
      target: '/zettel/cycle-time',
      source: 'product-development',
    },
    {
      target: '/zettel/cycle-time',
      source: 'time-to-market',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'branding',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'energy',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'mission',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'product',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'recruiting',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'startups',
    },
    {
      target:
        '/fundamentals-for-recruiters-that-make-people-want-to-work-with-you',
      source: 'vision',
    },
    {
      target: '/zettel/startup-burn-rate',
      source: 'metrics',
    },
    {
      target: '/zettel/startup-burn-rate',
      source: 'startup-metrics',
    },
    {
      target: '/zettel/startup-burn-rate',
      source: 'startups',
    },
    {
      target: '/zettel/cost-of-delay',
      source: 'cost-of-delay',
    },
    {
      target: '/zettel/cost-of-delay',
      source: 'product-development',
    },
    {
      target: '/zettel/cost-of-delay',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/business-agility',
      source: 'agile',
    },
    {
      target: '/zettel/business-agility',
      source: 'business',
    },
    {
      target: '/zettel/business-agility',
      source: 'business-agility',
    },
    {
      target: '/zettel/business-agility',
      source: 'product-development',
    },
    {
      target: '/zettel/product-management',
      source: 'business',
    },
    {
      target: '/zettel/product-management',
      source: 'creativity',
    },
    {
      target: '/zettel/product-management',
      source: 'customers',
    },
    {
      target: '/zettel/product-management',
      source: 'product-management',
    },
    {
      target: '/zettel/product-management',
      source: 'user-experience',
    },
    {
      target: '/zettel/product-manager',
      source: 'business',
    },
    {
      target: '/zettel/product-manager',
      source: 'design',
    },
    {
      target: '/zettel/product-manager',
      source: 'engineering',
    },
    {
      target: '/zettel/product-manager',
      source: 'finances',
    },
    {
      target: '/zettel/product-manager',
      source: 'marketing',
    },
    {
      target: '/zettel/product-manager',
      source: 'product',
    },
    {
      target: '/zettel/product-manager',
      source: 'product-development',
    },
    {
      target: '/zettel/product-manager',
      source: 'product-manager',
    },
    {
      target: '/zettel/product-manager',
      source: 'startups',
    },
    {
      target: '/zettel/product-manager',
      source: 'vision',
    },
    {
      target: '/zettel/product-owner',
      source: 'agile',
    },
    {
      target: '/zettel/product-owner',
      source: 'engineering',
    },
    {
      target: '/zettel/product-owner',
      source: 'product-development',
    },
    {
      target: '/zettel/product-owner',
      source: 'scrum',
    },
    {
      target: '/zettel/product-owner',
      source: 'startups',
    },
    {
      target: '/zettel/the-pyramid-principle',
      source: 'business',
    },
    {
      target: '/zettel/the-pyramid-principle',
      source: 'communication',
    },
    {
      target: '/zettel/the-pyramid-principle',
      source: 'structured-thinking',
    },
    {
      target: '/zettel/the-pyramid-principle',
      source: 'the-pyramid-principle',
    },
    {
      target: '/zettel/the-pyramid-principle',
      source: 'thinking',
    },
    {
      target: '/zettel/the-pyramid-principle',
      source: 'writing',
    },
    {
      target: '/zettel/startup-ceo',
      source: 'ceo',
    },
    {
      target: '/zettel/startup-ceo',
      source: 'startups',
    },
    {
      target: '/zettel/startup-ceo',
      source: 'vision',
    },
    {
      target: '/zettel/startup-co-ce-os-problems',
      source: 'ceo',
    },
    {
      target: '/zettel/startup-co-ce-os-problems',
      source: 'startups',
    },
    {
      target: '/zettel/startup-founding-team-roles',
      source: 'culture',
    },
    {
      target: '/zettel/startup-founding-team-roles',
      source: 'startup',
    },
    {
      target: '/zettel/startup-founding-team-roles',
      source: 'vision',
    },
    {
      target: '/zettel/operating-outside-a-circle-of-competence',
      source: 'circle-of-competence',
    },
    {
      target: '/zettel/operating-outside-a-circle-of-competence',
      source: 'mental-models',
    },
    {
      target: '/zettel/building-and-maintaining-a-circle-of-competence',
      source: 'circle-of-competence',
    },
    {
      target: '/zettel/building-and-maintaining-a-circle-of-competence',
      source: 'cognitive-bias',
    },
    {
      target: '/zettel/building-and-maintaining-a-circle-of-competence',
      source: 'journal',
    },
    {
      target: '/zettel/circle-of-competence',
      source: 'circle-of-competence',
    },
    {
      target: '/zettel/circle-of-competence',
      source: 'mental-models',
    },
    {
      target: '/zettel/functional-fixedness',
      source: 'cognitive-bias',
    },
    {
      target: '/zettel/the-four-types-of-consequences',
      source: 'management',
    },
    {
      target: '/zettel/the-four-types-of-consequences',
      source: 'the-7-habits-of-highly-effective-people',
    },
    {
      target: '/five-habits-for-the-next-five-years-first-year',
      source: 'habits',
    },
    {
      target: '/five-habits-for-the-next-five-years-first-year',
      source: 'meditation',
    },
    {
      target: '/five-habits-for-the-next-five-years-first-year',
      source: 'workout',
    },
    {
      target: '/five-habits-for-the-next-five-years-first-year',
      source: 'writing',
    },
    {
      target: '/zettel/human-nature-explanations',
      source: 'determinism',
    },
    {
      target: '/zettel/human-nature-explanations',
      source: 'environment',
    },
    {
      target: '/zettel/human-nature-explanations',
      source: 'genetics',
    },
    {
      target: '/zettel/human-nature-explanations',
      source: 'psychology',
    },
    {
      target: '/zettel/little-s-law',
      source: 'john-d-c-little',
    },
    {
      target: '/zettel/little-s-law',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/cumulative-flow-diagram-cfd',
      source: 'cumulative-flow-diagram',
    },
    {
      target: '/zettel/cumulative-flow-diagram-cfd',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/csd-matrix',
      source: 'csd-matrix',
    },
    {
      target: '/zettel/csd-matrix',
      source: 'design-thinking',
    },
    {
      target: '/zettel/csd-matrix',
      source: 'innovation',
    },
    {
      target: '/zettel/csd-matrix',
      source: 'product-development',
    },
    {
      target: '/zettel/the-benefits-of-formal-education',
      source: 'education',
    },
    {
      target: '/zettel/the-benefits-of-formal-education',
      source: 'knowledge',
    },
    {
      target: '/zettel/the-benefits-of-formal-education',
      source: 'network',
    },
    {
      target: '/zettel/the-miles-framework',
      source: 'intelligence',
    },
    {
      target: '/zettel/the-miles-framework',
      source: 'luck',
    },
    {
      target: '/zettel/the-miles-framework',
      source: 'money',
    },
    {
      target: '/zettel/the-miles-framework',
      source: 'status',
    },
    {
      target: '/zettel/the-miles-framework',
      source: 'the-unfair-advantage',
    },
    {
      target: '/zettel/reality-growth-mindset',
      source: 'mental-models',
    },
    {
      target: '/zettel/agile-methodologies',
      source: 'agile',
    },
    {
      target: '/zettel/agile-methodologies',
      source: 'software-development',
    },
    {
      target: '/zettel/scrum-master',
      source: 'agile',
    },
    {
      target: '/zettel/scrum-master',
      source: 'scrum',
    },
    {
      target: '/zettel/scrum-master',
      source: 'scrum-master',
    },
    {
      target: '/zettel/scrum-master',
      source: 'software-development',
    },
    {
      target: '/zettel/diffusion-of-innovations-adopter-categories',
      source: 'diffusion-of-innovations',
    },
    {
      target: '/zettel/diffusion-of-innovations-adopter-categories',
      source: 'innovation',
    },
    {
      target: '/zettel/diffusion-of-innovations-adopter-categories',
      source: 'technology',
    },
    {
      target: '/zettel/twelve-principles-of-agile-software',
      source: 'agile',
    },
    {
      target: '/zettel/twelve-principles-of-agile-software',
      source: 'software-development',
    },
    {
      target: '/meditation-roadmap',
      source: 'meditation',
    },
    {
      target: '/meditation-roadmap',
      source: 'mindfulness',
    },
    {
      target: '/meditation-roadmap',
      source: 'phonological-loop',
    },
    {
      target: '/meditation-roadmap',
      source: 'visuospatial-sketchpad',
    },
    {
      target: '/zettel/phonological-loop',
      source: 'mind',
    },
    {
      target: '/zettel/phonological-loop',
      source: 'phonological-loop',
    },
    {
      target: '/zettel/phonological-loop',
      source: 'working-memory',
    },
    {
      target: '/zettel/visuospatial-sketchpad',
      source: 'aphantasia',
    },
    {
      target: '/zettel/visuospatial-sketchpad',
      source: 'mind',
    },
    {
      target: '/zettel/visuospatial-sketchpad',
      source: 'visuospatial-sketchpad',
    },
    {
      target: '/zettel/visuospatial-sketchpad',
      source: 'working-memory',
    },
    {
      target: '/what-are-mission-vision-and-values',
      source: 'business',
    },
    {
      target: '/what-are-mission-vision-and-values',
      source: 'principles',
    },
    {
      target: '/what-are-mission-vision-and-values',
      source: 'startups',
    },
    {
      target: '/what-are-mission-vision-and-values',
      source: 'time',
    },
    {
      target: '/what-are-mission-vision-and-values',
      source: 'values',
    },
    {
      target: '/what-are-mission-vision-and-values',
      source: 'vision',
    },
    {
      target: '/zettel/innovation',
      source: 'innovation',
    },
    {
      target: '/zettel/innovation',
      source: 'product-development',
    },
    {
      target: '/zettel/purposeful-stupidity',
      source: 'bureaucracy',
    },
    {
      target: '/zettel/purposeful-stupidity',
      source: 'business',
    },
    {
      target: '/zettel/purposeful-stupidity',
      source: 'cia',
    },
    {
      target: '/zettel/purposeful-stupidity',
      source: 'government',
    },
    {
      target: '/zettel/purposeful-stupidity',
      source: 'strategy',
    },
    {
      target: '/newsletter-v1',
      source: 'learning',
    },
    {
      target: '/newsletter-v1',
      source: 'newsletter',
    },
    {
      target: '/newsletter-v1',
      source: 'social-media',
    },
    {
      target: '/newsletter-v1',
      source: 'writing',
    },
    {
      target: '/zettel/exponential-technology',
      source: 'moore-s-law',
    },
    {
      target: '/zettel/exponential-technology',
      source: 'solar-power-generation',
    },
    {
      target: '/zettel/moore-s-law',
      source: 'computing',
    },
    {
      target: '/zettel/moore-s-law',
      source: 'electronic-circuits',
    },
    {
      target: '/zettel/moore-s-law',
      source: 'gordon-e-moore',
    },
    {
      target: '/zettel/moore-s-law',
      source: 'moore-s-law',
    },
    {
      target: '/zettel/moore-s-law',
      source: 'semiconductors',
    },
    {
      target: '/zettel/moore-s-law',
      source: 'transistors',
    },
    {
      target: '/zettel/m-g-1-queue',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/octave-interval',
      source: 'music',
    },
    {
      target: '/zettel/octave-interval',
      source: 'physics',
    },
    {
      target: '/zettel/lno-effectiveness-framework',
      source: 'product-management',
    },
    {
      target: '/zettel/lno-effectiveness-framework',
      source: 'time-management',
    },
    {
      target: '/zettel/virality-potential-criteria',
      source: 'marketing',
    },
    {
      target: '/zettel/virality-potential-criteria',
      source: 'network',
    },
    {
      target: '/zettel/virality-potential-criteria',
      source: 'social-network',
    },
    {
      target: '/zettel/winner-s-curse',
      source: 'atlantic-richfield',
    },
    {
      target: '/zettel/winner-s-curse',
      source: 'economics',
    },
    {
      target: '/zettel/winner-s-curse',
      source: 'gulf-of-mexico',
    },
    {
      target: '/zettel/network-effects',
      source: 'business',
    },
    {
      target: '/zettel/network-effects',
      source: 'economics',
    },
    {
      target: '/zettel/network-effects',
      source: 'facebook',
    },
    {
      target: '/zettel/network-effects',
      source: 'network-effect',
    },
    {
      target: '/zettel/network-effects',
      source: 'network-effects',
    },
    {
      target: '/zettel/network-effects',
      source: 'social-network',
    },
    {
      target: '/zettel/network-effects',
      source: 'startups',
    },
    {
      target: '/zettel/network-effects',
      source: 'twitter',
    },
    {
      target: '/zettel/accountability-psychological-trigger',
      source: 'psychological-triggers',
    },
    {
      target: '/zettel/authority-psychological-trigger',
      source: 'marketing',
    },
    {
      target: '/zettel/authority-psychological-trigger',
      source: 'psychological-triggers',
    },
    {
      target: '/zettel/vedas',
      source: 'hinduism',
    },
    {
      target: '/zettel/vedas',
      source: 'india',
    },
    {
      target: '/zettel/endocrine-glands-and-chakras-correlation',
      source: 'biology',
    },
    {
      target: '/zettel/endocrine-glands-and-chakras-correlation',
      source: 'chakra',
    },
    {
      target: '/zettel/endocrine-glands-and-chakras-correlation',
      source: 'emotions',
    },
    {
      target: '/zettel/endocrine-glands-and-chakras-correlation',
      source: 'endocrine-system',
    },
    {
      target: '/zettel/endocrine-glands-and-chakras-correlation',
      source: 'mind',
    },
    {
      target: '/zettel/fight-or-flight',
      source: 'biochemical',
    },
    {
      target: '/zettel/fight-or-flight',
      source: 'biology',
    },
    {
      target: '/zettel/fight-or-flight',
      source: 'psychology',
    },
    {
      target: '/zettel/fight-or-flight',
      source: 'walter-cannon',
    },
    {
      target: '/zettel/thalamus',
      source: 'biology',
    },
    {
      target: '/zettel/thalamus',
      source: 'brain',
    },
    {
      target: '/zettel/maslow-s-hierarchy-of-needs',
      source: 'abraham-maslow',
    },
    {
      target: '/zettel/maslow-s-hierarchy-of-needs',
      source: 'motivation',
    },
    {
      target: '/zettel/maslow-s-hierarchy-of-needs',
      source: 'psychology',
    },
    {
      target: '/zettel/base-chakra',
      source: 'biology',
    },
    {
      target: '/zettel/base-chakra',
      source: 'chakra',
    },
    {
      target: '/zettel/hormones',
      source: 'biology',
    },
    {
      target: '/zettel/hormones',
      source: 'chemistry',
    },
    {
      target: '/zettel/hormones',
      source: 'hormones',
    },
    {
      target: '/zettel/testosterone',
      source: 'biology',
    },
    {
      target: '/zettel/testosterone',
      source: 'chemistry',
    },
    {
      target: '/zettel/testosterone',
      source: 'hormones',
    },
    {
      target: '/zettel/queue-capacity-utilization',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/queue-service-process',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/anecdotal-evidence',
      source: 'cognitive-bias',
    },
    {
      target: '/zettel/anecdotal-evidence',
      source: 'scientific-method',
    },
    {
      target: '/zettel/cognitive-bias',
      source: 'cognitive-bias',
    },
    {
      target: '/zettel/cognitive-bias',
      source: 'heuristic',
    },
    {
      target: '/zettel/cognitive-bias',
      source: 'psychology',
    },
    {
      target: '/zettel/heuristic',
      source: 'heuristic',
    },
    {
      target: '/zettel/heuristic',
      source: 'problem-solving',
    },
    {
      target: '/zettel/inductive-argument',
      source: 'inductive-reasoning',
    },
    {
      target: '/zettel/inductive-argument',
      source: 'logic',
    },
    {
      target: '/zettel/inductive-argument',
      source: 'philosophy',
    },
    {
      target: '/zettel/critical-path',
      source: 'critical-path',
    },
    {
      target: '/zettel/critical-path',
      source: 'product-development',
    },
    {
      target: '/zettel/critical-path',
      source: 'product-management',
    },
    {
      target: '/zettel/critical-path',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/markov-process',
      source: 'statistics',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'agner-krarup-erlang',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'david-kendall',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'kendal-notation',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'math',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'product-development',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'queueing-theory',
    },
    {
      target: '/zettel/queueing-theory',
      source: 'statistics',
    },
    {
      target: '/zettel/vp-of-engineering',
      source: 'engineering',
    },
    {
      target: '/zettel/vp-of-engineering',
      source: 'software-engineering',
    },
    {
      target: '/zettel/vp-of-engineering',
      source: 'startups',
    },
    {
      target: '/zettel/asymmetric-opportunity',
      source: 'cryptocurrencies',
    },
    {
      target: '/zettel/asymmetric-opportunity',
      source: 'learning-in-public',
    },
    {
      target: '/zettel/newsvendor-model',
      source: 'critical-fractile',
    },
    {
      target: '/zettel/newsvendor-model',
      source: 'economics',
    },
    {
      target: '/zettel/newsvendor-model',
      source: 'inventory',
    },
    {
      target: '/zettel/newsvendor-model',
      source: 'math',
    },
    {
      target: '/zettel/newsvendor-model',
      source: 'optimization',
    },
    {
      target: '/zettel/venture-backable-business',
      source: 'business',
    },
    {
      target: '/zettel/venture-backable-business',
      source: 'startups',
    },
    {
      target: '/zettel/venture-backable-business',
      source: 'venture-capital',
    },
    {
      target: '/zettel/set-based-concurrent-engineering',
      source: 'product-development',
    },
    {
      target: '/zettel/set-based-concurrent-engineering',
      source: 'toyota',
    },
    {
      target: '/zettel/marginal-analysis',
      source: 'business',
    },
    {
      target: '/zettel/marginal-analysis',
      source: 'microeconomics',
    },
    {
      target: '/zettel/key-value-database',
      source: 'database',
    },
    {
      target: '/zettel/key-value-database',
      source: 'key-value-database',
    },
    {
      target: '/zettel/key-value-database',
      source: 'nosql',
    },
    {
      target: '/zettel/sunk-cost',
      source: 'business',
    },
    {
      target: '/zettel/sunk-cost',
      source: 'economics',
    },
    {
      target: '/zettel/sunk-cost',
      source: 'sunk-cost',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: 'alberto-brandolini',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: 'brandolini-s-law',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: 'fake-news',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: 'internet',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: 'mark-twain',
    },
    {
      target: '/zettel/brandolini-s-law',
      source: 'mental-models',
    },
    {
      target: '/zettel/design-system',
      source: 'design',
    },
    {
      target: '/zettel/design-system',
      source: 'design-system',
    },
    {
      target: '/zettel/design-system',
      source: 'user-experience',
    },
    {
      target: '/zettel/design-system',
      source: 'user-interface',
    },
    {
      target: '/zettel/pareto-paradox',
      source: 'pareto-principle',
    },
    {
      target: '/zettel/pareto-paradox',
      source: 'project-management',
    },
    {
      target: '/zettel/pareto-principle',
      source: '80-20-rule',
    },
    {
      target: '/zettel/pareto-principle',
      source: 'computer-science',
    },
    {
      target: '/zettel/pareto-principle',
      source: 'economics',
    },
    {
      target: '/zettel/pareto-principle',
      source: 'lay-of-the-vital-few',
    },
    {
      target: '/zettel/pareto-principle',
      source: 'mental-models',
    },
    {
      target: '/zettel/pareto-principle',
      source: 'pareto-principle',
    },
    {
      target: '/zettel/pareto-principle',
      source: 'vilfredo-pareto',
    },
    {
      target: '/zettel/matrix-determinant',
      source: 'linear-algebra',
    },
    {
      target: '/zettel/matrix-determinant',
      source: 'matrix',
    },
    {
      target: '/zettel/vector-space',
      source: 'linear-algebra',
    },
    {
      target: '/zettel/vector-space',
      source: 'math',
    },
    {
      target: '/zettel/proxy-variable',
      source: 'proxy',
    },
    {
      target: '/zettel/proxy-variable',
      source: 'statistics',
    },
    {
      target: '/zettel/goodhart-s-law',
      source: 'charles-goodhart',
    },
    {
      target: '/zettel/goodhart-s-law',
      source: 'goodhart-s-law',
    },
    {
      target: '/zettel/goodhart-s-law',
      source: 'mental-models',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: 'getting-things-done',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: 'hyperbolic-discounting',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: 'natural-planning-model',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: 'opportunity-cost',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: 'reactive-planning-model',
    },
    {
      target: '/from-reactive-planning-model-to-natural-planning-model',
      source: 'software-development',
    },
    {
      target: '/zettel/benjamin-franklin-s-schedule',
      source: 'benjamin-franklin',
    },
    {
      target: '/zettel/benjamin-franklin-s-schedule',
      source: 'time-management',
    },
    {
      target: '/a-letter-to-my-friend-create',
      source: 'writing',
    },
    {
      target: '/zettel/radical-delegation-framework',
      source: 'mental-models',
    },
    {
      target: '/zettel/radical-delegation-framework',
      source: 'project-management',
    },
    {
      target: '/zettel/radical-delegation-framework',
      source: 'shreyas-doshi',
    },
    {
      target: '/zettel/natural-planning-model',
      source: 'brainstorming',
    },
    {
      target: '/zettel/natural-planning-model',
      source: 'getting-things-done',
    },
    {
      target: '/zettel/natural-planning-model',
      source: 'mental-models',
    },
    {
      target: '/zettel/natural-planning-model',
      source: 'natural-planning-model',
    },
    {
      target: '/zettel/natural-planning-model',
      source: 'planning',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: 'brainstorming',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: 'getting-things-done',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: 'mental-models',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: 'planning',
    },
    {
      target: '/zettel/reactive-planning-model',
      source: 'reactive-planning-model',
    },
    {
      target: '/zettel/spacing-effect-learning',
      source: 'hermann-ebbinghaus',
    },
    {
      target: '/zettel/spacing-effect-learning',
      source: 'learning',
    },
    {
      target: '/zettel/spacing-effect-learning',
      source: 'long-term-memory',
    },
    {
      target: '/zettel/opportunity-cost',
      source: 'economics',
    },
    {
      target: '/zettel/opportunity-cost',
      source: 'investment',
    },
    {
      target: '/zettel/opportunity-cost',
      source: 'mental-models',
    },
    {
      target: '/zettel/opportunity-cost',
      source: 'microeconomics',
    },
    {
      target: '/zettel/opportunity-cost',
      source: 'opportunity-cost',
    },
    {
      target: '/zettel/context-switching',
      source: 'context-switching',
    },
    {
      target: '/zettel/context-switching',
      source: 'multitasking',
    },
    {
      target: '/zettel/context-switching',
      source: 'productivity',
    },
    {
      target: '/zettel/focus-brings-unconscious-support',
      source: 'focus',
    },
    {
      target: '/zettel/focus-brings-unconscious-support',
      source: 'maxwell-maltz',
    },
    {
      target: '/zettel/focus-brings-unconscious-support',
      source: 'mind',
    },
    {
      target: '/zettel/ownership-may-prevent-parkinson-s-law',
      source: 'efficiency',
    },
    {
      target: '/zettel/ownership-may-prevent-parkinson-s-law',
      source: 'ownership',
    },
    {
      target: '/zettel/ownership-may-prevent-parkinson-s-law',
      source: 'parkinson-s-law',
    },
    {
      target: '/zettel/daily-scrum',
      source: 'scrum',
    },
    {
      target: '/skydiving-terminal-velocity',
      source: 'calculus',
    },
    {
      target: '/skydiving-terminal-velocity',
      source: 'gravitational-force',
    },
    {
      target: '/skydiving-terminal-velocity',
      source: 'hyperbolic-trigonometry',
    },
    {
      target: '/skydiving-terminal-velocity',
      source: 'physics',
    },
    {
      target: '/zettel/brainstorming',
      source: 'brainstorming',
    },
    {
      target: '/zettel/brainstorming',
      source: 'creativity',
    },
    {
      target: '/zettel/brainstorming',
      source: 'problem-solving',
    },
    {
      target: '/zettel/distributed-cognition',
      source: 'brain',
    },
    {
      target: '/zettel/distributed-cognition',
      source: 'brainstorming',
    },
    {
      target: '/zettel/distributed-cognition',
      source: 'mind',
    },
    {
      target: '/zettel/slack-and-efficiency',
      source: 'efficiency',
    },
    {
      target: '/zettel/slack-and-efficiency',
      source: 'productivity',
    },
    {
      target: '/my-story-the-dance-teacher',
      source: 'my-story',
    },
    {
      target: '/zettel/acid-database-systems',
      source: 'andreas-reuter',
    },
    {
      target: '/zettel/acid-database-systems',
      source: 'computer-science',
    },
    {
      target: '/zettel/acid-database-systems',
      source: 'database',
    },
    {
      target: '/zettel/acid-database-systems',
      source: 'theo-harder',
    },
    {
      target: '/zettel/the-threefold-model-for-identifying-daily-work',
      source: 'getting-things-done',
    },
    {
      target: '/zettel/the-threefold-model-for-identifying-daily-work',
      source: 'mental-models',
    },
    {
      target: '/zettel/the-threefold-model-for-identifying-daily-work',
      source: 'productivity',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: 'andrew-h-hales',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: 'benjamin-a-converse',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: 'gabrielle-s-adams',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: 'leidy-e-klotz',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: 'mental-models',
    },
    {
      target: '/zettel/people-systematically-overlook-subtractive-changes',
      source: 'psychology',
    },
    {
      target: '/zettel/system-mental-models',
      source: 'mental-models',
    },
    {
      target: '/zettel/decision-mental-models',
      source: 'decision-making',
    },
    {
      target: '/zettel/decision-mental-models',
      source: 'mental-models',
    },
    {
      target:
        '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      source: 'getting-things-done',
    },
    {
      target:
        '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      source: 'mental-models',
    },
    {
      target:
        '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      source: 'productivity',
    },
    {
      target:
        '/zettel/the-four-criteria-model-for-choosing-actions-in-the-moment',
      source: 'time-management',
    },
    {
      target: '/zettel/smart-contracts',
      source: 'blockchain',
    },
    {
      target: '/zettel/smart-contracts',
      source: 'nick-szabo',
    },
    {
      target: '/zettel/smart-contracts',
      source: 'smart-contracts',
    },
    {
      target: '/zettel/atkinson-shiffrin-memory-model',
      source: 'memory',
    },
    {
      target: '/zettel/atkinson-shiffrin-memory-model',
      source: 'richard-atkinson',
    },
    {
      target: '/zettel/atkinson-shiffrin-memory-model',
      source: 'richard-shiffrin',
    },
    {
      target: '/zettel/long-term-memory',
      source: 'long-term-memory',
    },
    {
      target: '/zettel/long-term-memory',
      source: 'memory',
    },
    {
      target: '/zettel/short-term-memory',
      source: 'memory',
    },
    {
      target: '/zettel/short-term-memory',
      source: 'short-term-memory',
    },
    {
      target: '/zettel/ideas-in-open-loop',
      source: 'getting-things-done',
    },
    {
      target: '/zettel/ideas-in-open-loop',
      source: 'mind',
    },
    {
      target: '/zettel/ideas-in-open-loop',
      source: 'productivity',
    },
    {
      target: '/zettel/pleasure-principle-psychology',
      source: 'psychology',
    },
    {
      target: '/zettel/procrastination',
      source: 'anxiety',
    },
    {
      target: '/zettel/procrastination',
      source: 'procrastination',
    },
    {
      target: '/zettel/procrastination',
      source: 'productivity',
    },
    {
      target: '/zettel/procrastination',
      source: 'time-management',
    },
    {
      target: '/zettel/hyperbolic-discounting',
      source: 'economics',
    },
    {
      target: '/zettel/hyperbolic-discounting',
      source: 'hyperbolic-discounting',
    },
    {
      target: '/zettel/hyperbolic-discounting',
      source: 'mental-models',
    },
    {
      target: '/zettel/hyperbolic-discounting',
      source: 'psychology',
    },
    {
      target: '/zettel/mental-models',
      source: 'biology',
    },
    {
      target: '/zettel/mental-models',
      source: 'brain',
    },
    {
      target: '/zettel/mental-models',
      source: 'chemistry',
    },
    {
      target: '/zettel/mental-models',
      source: 'decision-making',
    },
    {
      target: '/zettel/mental-models',
      source: 'economics',
    },
    {
      target: '/zettel/mental-models',
      source: 'mental-models',
    },
    {
      target: '/zettel/mental-models',
      source: 'physics',
    },
    {
      target: '/zettel/mental-models',
      source: 'psychology',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: 'dan-s-kennedy',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: 'habits',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: 'productivity',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: 'time',
    },
    {
      target: '/books/no-b-s-time-management-for-entrepreneurs',
      source: 'time-management',
    },
    {
      target: '/zettel/dopamine',
      source: 'brain',
    },
    {
      target: '/zettel/dopamine',
      source: 'dopamine',
    },
    {
      target: '/zettel/dopamine',
      source: 'neurotransmitter',
    },
    {
      target: '/zettel/social-media-addiction',
      source: 'addiction',
    },
    {
      target: '/zettel/social-media-addiction',
      source: 'anxiety',
    },
    {
      target: '/zettel/social-media-addiction',
      source: 'depression',
    },
    {
      target: '/zettel/social-media-addiction',
      source: 'loneliness',
    },
    {
      target: '/zettel/social-media-addiction',
      source: 'psychology',
    },
    {
      target: '/zettel/social-media-addiction',
      source: 'social-media',
    },
    {
      target: '/zettel/dan-s-kennedy',
      source: 'copywriting',
    },
    {
      target: '/zettel/dan-s-kennedy',
      source: 'dan-s-kennedy',
    },
    {
      target: '/zettel/dan-s-kennedy',
      source: 'marketing',
    },
    {
      target: '/zettel/dan-s-kennedy',
      source: 'time-management',
    },
    {
      target: '/zettel/product-market-fit',
      source: 'andy-rachleff',
    },
    {
      target: '/zettel/product-market-fit',
      source: 'business',
    },
    {
      target: '/zettel/product-market-fit',
      source: 'marc-andreesen',
    },
    {
      target: '/zettel/product-market-fit',
      source: 'market',
    },
    {
      target: '/zettel/product-market-fit',
      source: 'startups',
    },
    {
      target: '/zettel/organic-social-media',
      source: 'marketing',
    },
    {
      target: '/zettel/organic-social-media',
      source: 'organic-social-media',
    },
    {
      target: '/zettel/organic-social-media',
      source: 'social-media',
    },
    {
      target: '/zettel/paid-social-media',
      source: 'marketing',
    },
    {
      target: '/zettel/paid-social-media',
      source: 'paid-social-media',
    },
    {
      target: '/zettel/paid-social-media',
      source: 'social-media',
    },
    {
      target: '/zettel/human-multitasking',
      source: 'brain',
    },
    {
      target: '/zettel/human-multitasking',
      source: 'context-switching',
    },
    {
      target: '/zettel/human-multitasking',
      source: 'multisensory',
    },
    {
      target: '/zettel/human-multitasking',
      source: 'multitasking',
    },
    {
      target: '/zettel/human-multitasking',
      source: 'productivity',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: '90-90-rule',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: 'last-mile',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: 'product-development',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: 'project-management',
    },
    {
      target: '/last-mile-in-a-software-project',
      source: 'software-engineering',
    },
    {
      target: '/zettel/startup-accelerator',
      source: 'entrepreneurship',
    },
    {
      target: '/zettel/startup-accelerator',
      source: 'startup-accelerator',
    },
    {
      target: '/zettel/startup-accelerator',
      source: 'startups',
    },
    {
      target: '/zettel/venture-building-s-startups-problems',
      source: 'startups',
    },
    {
      target: '/zettel/venture-building-s-startups-problems',
      source: 'venture-building',
    },
    {
      target: '/zettel/venture-capital',
      source: 'business',
    },
    {
      target: '/zettel/venture-capital',
      source: 'entrepreneurship',
    },
    {
      target: '/zettel/venture-capital',
      source: 'startups',
    },
    {
      target: '/zettel/venture-capital',
      source: 'venture-capital',
    },
    {
      target: '/zettel/startup-incubator',
      source: '500-startups',
    },
    {
      target: '/zettel/startup-incubator',
      source: 'entrepreneurship',
    },
    {
      target: '/zettel/startup-incubator',
      source: 'startup-incubator',
    },
    {
      target: '/zettel/startup-incubator',
      source: 'startups',
    },
    {
      target: '/zettel/startup-incubator',
      source: 'techstars',
    },
    {
      target: '/zettel/startup-incubator',
      source: 'y-combinator',
    },
    {
      target: '/zettel/startup-studio',
      source: 'entrepreneurship',
    },
    {
      target: '/zettel/startup-studio',
      source: 'pioneer-square-labs',
    },
    {
      target: '/zettel/startup-studio',
      source: 'rocket-internet',
    },
    {
      target: '/zettel/startup-studio',
      source: 'startup-studio',
    },
    {
      target: '/zettel/startup-studio',
      source: 'startups',
    },
    {
      target: '/zettel/startup-studio',
      source: 'venture-building',
    },
    {
      target: '/zettel/startup-studio',
      source: 'venture-capital',
    },
    {
      target: '/zettel/proof-of-work',
      source: 'bitcoin',
    },
    {
      target: '/zettel/proof-of-work',
      source: 'blockchain',
    },
    {
      target: '/zettel/proof-of-work',
      source: 'cryptocurrencies',
    },
    {
      target: '/zettel/proof-of-work',
      source: 'cryptography',
    },
    {
      target: '/zettel/proof-of-work',
      source: 'cynthia-dwork',
    },
    {
      target: '/zettel/proof-of-work',
      source: 'moni-namor',
    },
    {
      target: '/zettel/scrum',
      source: 'agile',
    },
    {
      target: '/zettel/scrum',
      source: 'agile-framework',
    },
    {
      target: '/zettel/scrum',
      source: 'scrum',
    },
    {
      target: '/zettel/inflation',
      source: 'economics',
    },
    {
      target: '/zettel/inflation',
      source: 'inflation',
    },
    {
      target: '/zettel/inflation',
      source: 'money-supply',
    },
    {
      target: '/zettel/money-supply',
      source: 'economics',
    },
    {
      target: '/zettel/money-supply',
      source: 'inflation',
    },
    {
      target: '/zettel/money-supply',
      source: 'macroeconomics',
    },
    {
      target: '/zettel/money-supply',
      source: 'money-supply',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: '90-90-rule',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: 'flow-state',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: 'kevin-kelly',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: 'parkinson-s-law',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: 'productivity',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: 'software-engineering',
    },
    {
      target: '/zettel/the-90-90-rule',
      source: 'tom-cargill',
    },
    {
      target: '/zettel/last-mile-problem',
      source: 'last-mile',
    },
    {
      target: '/zettel/last-mile-problem',
      source: 'last-mile-problem',
    },
    {
      target: '/zettel/last-mile-problem',
      source: 'logistics',
    },
    {
      target: '/zettel/last-mile-problem',
      source: 'telecommunications',
    },
    {
      target: '/zettel/dunning-kruger-effect',
      source: 'david-dunning',
    },
    {
      target: '/zettel/dunning-kruger-effect',
      source: 'dunning-kruger-effect',
    },
    {
      target: '/zettel/dunning-kruger-effect',
      source: 'justin-kruger',
    },
    {
      target: '/zettel/dunning-kruger-effect',
      source: 'psychology',
    },
    {
      target: '/zettel/flow-state-psychology',
      source: 'focus',
    },
    {
      target: '/zettel/flow-state-psychology',
      source: 'mihaly-csikszentmihalyi',
    },
    {
      target: '/zettel/flow-state-psychology',
      source: 'psychology',
    },
    {
      target: '/zettel/agile',
      source: 'agile',
    },
    {
      target: '/zettel/agile',
      source: 'agile-manifesto',
    },
    {
      target: '/zettel/agile',
      source: 'software-development',
    },
    {
      target: '/zettel/law-of-triviality',
      source: 'bike-shedding',
    },
    {
      target: '/zettel/law-of-triviality',
      source: 'parkinson-s-law',
    },
    {
      target: '/zettel/law-of-triviality',
      source: 'productivity',
    },
    {
      target: '/zettel/parkinson-s-law',
      source: 'efficiency',
    },
    {
      target: '/zettel/parkinson-s-law',
      source: 'parkinson-s-law',
    },
    {
      target: '/zettel/parkinson-s-law',
      source: 'productivity',
    },
    {
      target: '/five-habits-for-the-next-five-years',
      source: 'habits',
    },
    {
      target: '/zettel/lightning-decision-jam',
      source: 'problem-solving',
    },
    {
      target: '/zettel/aida-model',
      source: 'digital-marketing',
    },
    {
      target: '/zettel/aida-model',
      source: 'e-st-elmo-lewis',
    },
    {
      target: '/zettel/aida-model',
      source: 'emotions',
    },
    {
      target: '/zettel/aida-model',
      source: 'marketing',
    },
    {
      target: '/zettel/aida-model',
      source: 'selling',
    },
    {
      target: '/zettel/design-density',
      source: 'design',
    },
    {
      target: '/zettel/design-density',
      source: 'user-experience',
    },
    {
      target: '/zettel/design-density',
      source: 'user-interface',
    },
    {
      target: '/zettel/psychological-trigger',
      source: 'brain',
    },
    {
      target: '/zettel/psychological-trigger',
      source: 'psychological-trigger',
    },
    {
      target: '/zettel/psychological-trigger',
      source: 'psychological-triggers',
    },
    {
      target: '/zettel/psychological-trigger',
      source: 'psychology',
    },
    {
      target: '/zettel/better-writing',
      source: 'grammar',
    },
    {
      target: '/zettel/better-writing',
      source: 'writing',
    },
    {
      target: '/zettel/facts-don-t-change-our-minds',
      source: 'human-connection',
    },
    {
      target: '/zettel/facts-don-t-change-our-minds',
      source: 'mind',
    },
    {
      target: '/zettel/information-and-digital-content-in-modern-society',
      source: 'digital-content',
    },
    {
      target: '/zettel/information-and-digital-content-in-modern-society',
      source: 'modern-society',
    },
    {
      target: '/zettel/information-and-digital-content-in-modern-society',
      source: 'psychological-trigger',
    },
    {
      target: '/zettel/information-and-digital-content-in-modern-society',
      source: 'psychology',
    },
    {
      target: '/zettel/information-and-digital-content-in-modern-society',
      source: 'robert-b-cialdini',
    },
    {
      target: '/zettel/reading-metacognitively',
      source: 'learning',
    },
    {
      target: '/zettel/reading-metacognitively',
      source: 'reading',
    },
    {
      target: '/zettel/reading-metacognitively',
      source: 'reading-metacognitively',
    },
    {
      target: '/zettel/the-feynman-technique',
      source: 'feynman-technique',
    },
    {
      target: '/zettel/the-feynman-technique',
      source: 'learning',
    },
    {
      target: '/zettel/the-feynman-technique',
      source: 'richard-feynman',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'anxiety',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'bimodal-sleep',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'healthy',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'insomnia',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'sleep',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'sleep-two-shifts',
    },
    {
      target: '/zettel/sleep-in-two-shifts',
      source: 'two-phase-sleep',
    },
    {
      target: '/zettel/chunking-and-memory',
      source: 'chunking',
    },
    {
      target: '/zettel/chunking-and-memory',
      source: 'memory',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'brain',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'computing',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'hermann-von-helmholtz',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'humours',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'hydraulic-engineering',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'information-processing-metaphor',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'memory',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'telegraph',
    },
    {
      target: '/zettel/metaphors-to-explain-the-brain',
      source: 'thomas-hobbes',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'anxiety',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'brain',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'delayed-return-environment',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'emotions',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'human-behavior',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'immediate-return-environment',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'psychology',
    },
    {
      target: '/zettel/the-evolution-of-anxiety',
      source: 'stress',
    },
    {
      target: '/zettel/zettelkasten',
      source: 'learning',
    },
    {
      target: '/zettel/zettelkasten',
      source: 'zettelkasten',
    },
  ],
};
