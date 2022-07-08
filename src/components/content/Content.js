import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { participants } from "assets/testData/leaderboard";

const Content = ({}) => {
  const isLoggedInUser = localStorage.getItem("userId") ? true : false;
  const defaultMessage = "No Record Found";

  return (
    <>
      <Card className="card card-pos col-xs-12 col-sm-12 col-md-8 col-lg-8 my-3">
        <Accordion>
          {participants.map((partcipant, index) => {
            return (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  <span style={{ color: "#212529" }}>{partcipant.name}</span>
                  <span
                    style={{
                      position: "absolute",
                      right: "55px",
                      color: "#212529",
                    }}
                  >
                    {partcipant.points}
                  </span>
                </Accordion.Header>
                <Accordion.Body className="p0">
                  <Table striped borderless hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Event Name</th>
                        <th>Points</th>
                        <th>Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partcipant.events.map((event, eventIndex) => {
                        return (
                          <tr key={eventIndex}>
                            <td>{eventIndex + 1}</td>
                            <td>{event.name}</td>
                            <td>{event.points}</td>
                            <td>{event.rank}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Card>
    </>
  );
};

export default Content;
