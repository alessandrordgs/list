import { act, render, waitFor, screen } from "@testing-library/react";
import ListContextProvider, { ListContext } from "./ListContext";
import '@testing-library/jest-dom';

import axios from "axios";



jest.mock("axios");

const mockEvents = [
  { "id": "2489651045", "type": "CreateEvent", "actor": { "id": 665991, "login": "petroav", "gravatar_id": "", "url": "https://api.github.com/users/petroav", "avatar_url": "https://avatars.githubusercontent.com/u/665991?" }, "repo": { "id": 28688495, "name": "petroav/6.828", "url": "https://api.github.com/repos/petroav/6.828" }, "payload": { "ref": "master", "ref_type": "branch", "master_branch": "master", "description": "Solution to homework and assignments from MIT's 6.828 (Operating Systems Engineering). Done in my spare time.", "pusher_type": "user" }, "public": true, "created_at": "2015-01-01T15:00:00Z" }
  , { "id": "2489651051", "type": "PushEvent", "actor": { "id": 3854017, "login": "rspt", "gravatar_id": "", "url": "https://api.github.com/users/rspt", "avatar_url": "https://avatars.githubusercontent.com/u/3854017?" }, "repo": { "id": 28671719, "name": "rspt/rspt-theme", "url": "https://api.github.com/repos/rspt/rspt-theme" }, "payload": { "push_id": 536863970, "size": 1, "distinct_size": 1, "ref": "refs/heads/master", "head": "6b089eb4a43f728f0a594388092f480f2ecacfcd", "before": "437c03652caa0bc4a7554b18d5c0a394c2f3d326", "commits": [{ "sha": "6b089eb4a43f728f0a594388092f480f2ecacfcd", "author": { "email": "5c682c2d1ec4073e277f9ba9f4bdf07e5794dabe@rspt.ch", "name": "rspt" }, "message": "Fix main header height on mobile", "distinct": true, "url": "https://api.github.com/repos/rspt/rspt-theme/commits/6b089eb4a43f728f0a594388092f480f2ecacfcd" }] }, "public": true, "created_at": "2015-01-01T15:00:01Z" }
  , { "id": "2489651053", "type": "PushEvent", "actor": { "id": 6339799, "login": "izuzero", "gravatar_id": "", "url": "https://api.github.com/users/izuzero", "avatar_url": "https://avatars.githubusercontent.com/u/6339799?" }, "repo": { "id": 28270952, "name": "izuzero/xe-module-ajaxboard", "url": "https://api.github.com/repos/izuzero/xe-module-ajaxboard" }, "payload": { "push_id": 536863972, "size": 1, "distinct_size": 1, "ref": "refs/heads/develop", "head": "ec819b9df4fe612bb35bf562f96810bf991f9975", "before": "590433109f221a96cf19ea7a7d9a43ca333e3b3e", "commits": [{ "sha": "ec819b9df4fe612bb35bf562f96810bf991f9975", "author": { "email": "df05f55543db3c62cf64f7438018ec37f3605d3c@gmail.com", "name": "Eunsoo Lee" }, "message": "#20 게시글 및 댓글 삭제 시 새로고침이 되는 문제 해결\n\n원래 의도는 새로고침이 되지 않고 확인창만으로 해결되어야 함.\n기본 게시판 대응 플러그인에서 발생한 이슈.", "distinct": true, "url": "https://api.github.com/repos/izuzero/xe-module-ajaxboard/commits/ec819b9df4fe612bb35bf562f96810bf991f9975" }] }, "public": true, "created_at": "2015-01-01T15:00:01Z" }
  ,
];

describe("ListContext", () => {

  beforeEach(() => {
    act(() => {
      axios.get = jest.fn().mockResolvedValue({ data: mockEvents });
    })
  })

  it("should store events", async () => {
    await act(async () => render(
      <ListContextProvider>
        <ListContext.Consumer>
          {(context) => (
            <>
              {context.events?.map((event) => (
                <div key={event.id} data-testid={`event-${event.id}`}>
                  {event.type}
                </div>
              ))}
            </>
          )}
        </ListContext.Consumer>
      </ListContextProvider>
    ))

    await waitFor(() => {
      // Verifica se os eventos foram renderizados corretamente
      expect(screen.getByTestId("event-2489651045")).toHaveTextContent("CreateEvent");
      expect(screen.getByTestId("event-2489651051")).toHaveTextContent("PushEvent");
      expect(screen.getByTestId("event-2489651053")).toHaveTextContent("PushEvent");
    });
  })

  it("should select a row", async () => {

    await act(async () => render(
      <ListContextProvider>
        <ListContext.Consumer>
          {(context) => (
            <>
              {context.events?.map((event) => (
                <div key={event.id}>
                  <input type="checkbox" onChange={() => { }} checked={context?.rowsSelected?.includes(event.id)} onClick={() => context.handleRowSelected(event.id)} />
                  <div key={event.id} data-testid={`event-${event.id}`}>
                    {event.type}
                  </div>
                </div>
              ))}
            </>

          )}
        </ListContext.Consumer>
      </ListContextProvider>
    ))

    await waitFor(() => {
      screen.getAllByRole("checkbox")[0].click();
      expect(screen.getAllByRole("checkbox")[0]).toBeChecked();
    })
  })

  it('should edit a row', async () => {
    await act(async () => render(
      <ListContextProvider>
        <ListContext.Consumer>
          {(context) => (
            <>
              {context.events?.map((event) => (
                <div key={event.id}>
                  <div key={event.id} data-testid={`event-${event.id}`}>
                    {event.type}
                  </div>
                  <button onClick={() => context?.handleEditRow(event.id, "type", 'eventTest')}>Edit</button>
                </div>
              ))}

            </>
          )}
        </ListContext.Consumer>
      </ListContextProvider>
    ))

    await waitFor(() => {
      screen.getAllByRole("button")[0].click();
      expect(screen.getByTestId("event-2489651045")).toHaveTextContent("eventTest");
    })
  })

  it("should delete all rows", async () => {
    await act(async () => {
      render(
        <ListContextProvider>
          <ListContext.Consumer>
            {(context) => (
              <>
                {context.events?.map((event) => (
                  <div key={event.id}>
                    <input type="checkbox" onChange={() => { }} checked={context?.rowsSelected?.includes(event.id)} onClick={() => context.handleRowSelected(event.id)} />
                    <div key={event.id} data-testid={`event-${event.id}`}>
                      {event.type}
                    </div>
                  </div>
                ))}
                <button onClick={context?.handleDeleteRow}>Delete</button>
              </>
            )}
          </ListContext.Consumer>
        </ListContextProvider>
      )
    })

    await act(async () => {
      screen.getAllByRole("checkbox").forEach((checkbox) => checkbox.click())
      screen.getByRole('button').click()
    })
    await waitFor(() => {
      expect(screen.queryByTestId("event-2489651045")).toBeNull();
      expect(screen.queryByTestId("event-2489651051")).toBeNull();
      expect(screen.queryByTestId("event-2489651053")).toBeNull();
    })
  })


  it("should select all rows", async () => {
    await act(async () => render(
      <ListContextProvider>
        <ListContext.Consumer>
          {(context) => (
            <>
              {context.events?.map((event) => (
                <div key={event.id}>
                  <input type="checkbox" onChange={() => { }} checked={context?.rowsSelected?.includes(event.id)} onClick={() => context.handleRowSelected(event.id)} />
                  <div key={event.id} data-testid={`event-${event.id}`}>
                    {event.type}
                  </div>
                </div>
              ))}
              <button onClick={context?.handleSelectAllRows}>Select All</button>
            </>
          )}
        </ListContext.Consumer>
      </ListContextProvider>
    ))

    await waitFor(() => {
      screen.getAllByRole("button")[0].click();
      expect(screen.getAllByRole("checkbox")[0]).toBeChecked();
      expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
      expect(screen.getAllByRole("checkbox")[2]).toBeChecked();
    })
  })

})