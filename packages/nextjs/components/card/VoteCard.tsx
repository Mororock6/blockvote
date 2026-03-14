import { memo, useRef, useState } from "react";
import { PollType } from "~~/types/poll";

type VoteCardProps = {
  index: number;
  candidate: string;
  isChecked: boolean;
  isVoting: boolean;
  pollType: PollType;
  onChange: (checked: boolean, votes: number) => void;
  setIsInvalid: (value: boolean) => void;
  isInvalid: boolean;
  pollOpen: boolean;
  currentVotes?: number;
};

const VoteCard = ({
  index,
  candidate,
  onChange,
  pollType,
  isInvalid,
  setIsInvalid,
  pollOpen,
  currentVotes,
  isChecked,
  isVoting,
}: VoteCardProps) => {
  const [votes, setVotes] = useState(currentVotes || 0);
  const votesFieldRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="bg-primary flex w-full px-2 py-2 rounded-lg">
        {pollOpen && (
          <input
            type={pollType === PollType.SINGLE_VOTE ? "radio" : "checkbox"}
            className="mr-2"
            value={index}
            checked={isChecked}
            disabled={!pollOpen || isVoting}
            onChange={e => {
              if (e.target.checked) {
                switch (pollType) {
                  case PollType.SINGLE_VOTE:
                    onChange(true, 1);
                    break;
                  case PollType.MULTIPLE_VOTE:
                    onChange(true, 1);
                    break;
                  case PollType.WEIGHTED_MULTIPLE_VOTE:
                    onChange(true, votes);
                    if (votes) {
                      setIsInvalid(false);
                    } else {
                      setIsInvalid(true);
                    }
                    break;
                }
              } else {
                onChange(false, 0);
                setIsInvalid(false);
                setVotes(0);
                if (votesFieldRef.current) {
                  votesFieldRef.current.value = "";
                }
              }
            }}
            name={pollType === PollType.SINGLE_VOTE ? "candidate-votes" : `candidate-votes-${index}`}
          />
        )}

        <div className={!pollOpen ? "ml-2" : ""}>{candidate}</div>
      </div>

      {pollOpen && pollType === PollType.WEIGHTED_MULTIPLE_VOTE && (
        <input
          ref={votesFieldRef}
          type="number"
          className={
            "border border-slate-600 bg-primary text-primary-content placeholder:text-accent-content placeholder:font-light rounded-lg px-2 py-2 ml-2 w-20" +
            (isInvalid ? " border-red-500" : "")
          }
          disabled={!isChecked}
          placeholder="Votes"
          min={0}
          max={100}
          step={1}
          defaultValue={currentVotes || ""}
          onChange={function (e) {
            const rawValue = e.currentTarget.value;
            const parsedValue = Number(rawValue);
            const isEmpty = rawValue === "";
            const isInteger = Number.isInteger(parsedValue);
            const isInRange = parsedValue >= 0 && parsedValue <= 100;
            const isValid = !isEmpty && isInteger && Number.isFinite(parsedValue) && isInRange;

            if (!isValid) {
              setIsInvalid(isChecked);
              setVotes(0);
              onChange(isChecked, 0);
              return;
            }

            setIsInvalid(false);
            setVotes(parsedValue);
            onChange(isChecked, parsedValue);
          }}
        />
      )}
    </>
  );
};

export default memo(VoteCard, (prev, next) => {
  return (
    prev.index === next.index &&
    prev.candidate === next.candidate &&
    prev.isChecked === next.isChecked &&
    prev.isInvalid === next.isInvalid &&
    prev.pollOpen === next.pollOpen &&
    prev.pollType === next.pollType &&
    prev.isVoting === next.isVoting &&
    prev.onChange === next.onChange
  );
});
