const SlotSelector = ({ slots, onSelect }) => (
    <div className="grid grid-cols-3 gap-2">
      {slots.length === 0 ? <p className="text-red-500">No available slots</p> : slots.map(slot => (
        <button key={slot} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => onSelect(slot)}>
          {slot}
        </button>
      ))}
    </div>
  );
  
  export default SlotSelector;
  