export type SequencerStep = {
  notes: any[];
  index: number;
};

export default function buildSequencerStep(step: any, i): SequencerStep {
  if (typeof step === "string") {
    return {
      notes: [
        {
          name: step,
        },
      ],
      index: i,
    };
  } else if (step && (step as any).name) {
    return {
      notes: [
        {
          name: (step as any).name,
          duration: (step as any).duration,
          velocity: (step as any).velocity,
        },
      ],
      index: i,
    };
  } else if (Array.isArray(step)) {
    return {
      notes: step.map((s) => {
        if (typeof s === "string") {
          return {
            name: s,
          };
        }

        return s;
      }),
      index: i,
    };
  }

  return {
    notes: [],
    index: i,
  };
}
