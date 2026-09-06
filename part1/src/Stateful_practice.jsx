import { Table, Button } from "@chakra-ui/react";
import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <Table.Row>
      <Table.Cell>{text}</Table.Cell>
      <Table.Cell textAlign="end">
        {text === "positives" ? `${value} %` : value}
      </Table.Cell>
    </Table.Row>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positives }) => {
  return (
    <Table.ScrollArea borderWidth="1px" maxW="sm" mt={4}>
      <Table.Root size="sm" variant="outline">
        <Table.Body>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="total" value={total} />
          <StatisticsLine text="average" value={average.toFixed(2)} />
          <StatisticsLine text="positives" value={positives.toFixed(2)} />
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const average = total === 0 ? 0 : (good - bad) / total;
  const positives = total === 0 ? 0 : (good / total) * 100;

  return (
    <div style={{ padding: "20px" }}>
      <h2>give feedback</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="solid"
          colorPalette="green"
          onClick={() => setGood(good + 1)}
        >
          good
        </Button>
        <Button
          variant="solid"
          colorPalette="gray"
          onClick={() => setNeutral(neutral + 1)}
        >
          neutral
        </Button>
        <Button
          variant="solid"
          colorPalette="red"
          onClick={() => setBad(bad + 1)}
        >
          bad
        </Button>
      </div>

      <h2>Statistics</h2>

      {total > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positives={positives}
        />
      ) : (
        <p style={{ marginTop: "10px" }}>no feedback given</p>
      )}
    </div>
  );
};

export default App;
