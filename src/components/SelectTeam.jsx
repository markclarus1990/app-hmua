import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
function SelectTeam({
  selectedTeam,
  handleTeamSelect,
  availableTeams,
  newEvent,
  handleEventFormChange,
  handleModalClose,
  handleAddEventConfirm,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <ToastContainer />
        <h2 className="text-xl font-bold mb-4">Select a Team</h2>
        <select
          value={selectedTeam}
          onChange={handleTeamSelect}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="" disabled>
            -- Select a Team --
          </option>
          {availableTeams.map((team) => (
            <option key={team.team_id} value={team.team_description}>
              {team.description}
            </option>
          ))}
        </select>
        {/* <div className="scroll max-h-64 overflow-y-auto">
            <ContractComponent
              team={TEAMS.find((el) => el.team_id === selectedTeam)}
            />
          </div> */}
        {/* <label className="block mb-2">
          Start Time
          <input
            type="datetime-local"
            name="start"
            value={newEvent.start}
            onChange={handleEventFormChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          End Time
          <input
            type="datetime-local"
            name="end"
            value={newEvent.end}
            onChange={handleEventFormChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </label> */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddEventConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectTeam;
