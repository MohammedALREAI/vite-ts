import React from 'react';

import {
  gridLinesToTab,
  getStringNote,
  noteToFret,
  fretToNote,
} from '../../lib/tabUtils';
import { instrumentConfig } from '../../configs';

import css from './Tab.module.scss';

const Tab = ({
  grid = [],
  resolution = 8,
  bars = 2,
  instrument = 'ukulele',
  currentIndex = 0,
  className,
  onUpdateGrid,
}) => {
  const tab = gridLinesToTab(grid, resolution, bars);

  let textInputs = [];

  const handleTabChange = (event, stringIndex, step) => {
    const string = instrumentConfig[instrument].strings[stringIndex];
    let noteName;

    if (event.target.value) {
      noteName = fretToNote(parseInt(event.target.value, 10), string);
    } else {
      noteName = null;
    }

    // console.log(note, step, stringIndex);
    let newGrid = [...grid];

    // Filter out any noteObjects with matching step (ie overwrite)
    let newGridLine = grid[stringIndex].filter((noteObject) => {
      return noteObject.step !== step;
    });

    newGridLine.push({
      name: noteName,
      duration: 1,
      step, // TODO: step could be derived from array, but this makes things easier for now.
    });

    // Replace old gridLine
    newGrid[stringIndex] = newGridLine;

    if (typeof onUpdateGrid === 'function') {
      onUpdateGrid(newGrid);
    }
  };

  const handleKeyPress = (event, line, step) => {
    const { key } = event;
    const numberOfStrings = 4;
    const numberOfSteps = resolution * bars;
    let newLine, newStep, newTextInput;

    if (key === 'ArrowDown') {
      if (line !== numberOfStrings - 1 || step < numberOfSteps - 1) {
        // Catch end of inputs
        newLine = (line + 1) % numberOfStrings;
        newStep = line + 1 >= numberOfStrings ? step + 1 : step;

        newTextInput = textInputs[newLine][newStep];
        newTextInput.focus();
        event.preventDefault();
        newTextInput.select();
      }
    } else if (key === 'ArrowUp') {
      if (line - 1 >= 0 || step !== 0) {
        // Catch beginning of inputs
        newLine =
          line - 1 < 0 ? numberOfStrings - 1 : (line - 1) % numberOfStrings;
        newStep = line - 1 < 0 ? step - 1 : step;

        newTextInput = textInputs[newLine][newStep];
        newTextInput.focus();
        event.preventDefault();
        newTextInput.select();
      }
    } else if (
      key === 'ArrowRight' &&
      event.target.selectionEnd === event.target.value.length
    ) {
      if (step < numberOfSteps - 1 || line !== numberOfStrings - 1) {
        newLine = step + 1 >= numberOfSteps ? line + 1 : line;
        newStep = (step + 1) % numberOfSteps;
        newTextInput = textInputs[newLine][newStep];
        newTextInput.focus();
        event.preventDefault();
        newTextInput.select();
      }
    } else if (key === 'ArrowLeft' && event.target.selectionStart === 0) {
      if (step - 1 >= 0 || line !== 0) {
        newLine = step - 1 < 0 ? line - 1 : line;
        newStep = step - 1 < 0 ? numberOfSteps - 1 : (step - 1) % numberOfSteps;
        newTextInput = textInputs[newLine][newStep];
        newTextInput.focus();
        event.preventDefault();
        newTextInput.select();
      }
    }
  };

  const handleTabFocus = (event) => {
    event.target.select();
  };

  return (
    <div className={[css.tab, className || ''].join(' ')}>
      {tab.map((tabLine, i) => {
        const stringNote = getStringNote(instrument, i);
        textInputs[i] = [];

        return (
          <div
            className={css.tabLine}
            key={`string${i}`}
            data-testid={`tabLines`}
          >
            <div className={css.tabLineLine} />
            {/*<div>{stringNote}</div>*/}

            <div className={css.tabLineSteps}>
              {tabLine.map((step, j) => {
                const note = step && step.name ? step.name : undefined;
                const fret = noteToFret(note, stringNote);

                return (
                  <div
                    key={`step${j}`}
                    className={[
                      css.tabStep,
                      currentIndex === j ? css.tabStepIsCurrent : '',
                    ].join(' ')}
                    data-testid={'tabSteps'}
                  >
                    <input
                      type="text"
                      value={fret === null ? '' : fret}
                      onChange={(event) => handleTabChange(event, i, j)}
                      onKeyDown={(event) => handleKeyPress(event, i, j)}
                      onFocus={handleTabFocus}
                      ref={(input) => {
                        textInputs[i][j] = input;
                      }}
                      data-testid={`tabStepInput-${i}-${j}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
