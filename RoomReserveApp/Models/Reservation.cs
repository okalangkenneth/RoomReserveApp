namespace RoomReserveApp.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public string RoomType { get; set; }

        public string DateOfReservation { get; set; }

        public string PhotoFileName { get; set; }

    }
}
