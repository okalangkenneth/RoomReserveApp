const reservation = {
    template: `
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Reservation
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            Reservation Id
        </th>
        <th>
            RoomType
        </th>
        <th>
            DOR
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="emp in reservations">
        <td>{{emp.ReservationId}}</td>
        <td>{{emp.RoomType}}</td>
        <td>{{emp.DateOfReservation}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(emp)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(emp.ReservationId)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">
    <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 w-50 bd-highlight">
            <div class="input-group mb-3">
                <span class="input-group-text">RoomType</span>
                <select class="form-select" v-model="RoomType">
                    <option v-for="rty in roomTypes">
                    {{rty.roomTypes}}
                    </option>
                </select>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">DOR</span>
                <input type="date" class="form-control" v-model="DateOfReservation">
            </div>

        </div>
        <div class="p-2 w-50 bd-highlight">
            <img width="250px" height="250px"
                :src="PhotoPath+PhotoFileName"/>
            <input class="m-2" type="file" @change="imageUpload">
        </div>
    </div>
        <button type="button" @click="createClick()"
        v-if="ReservationId==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="ReservationId!=0" class="btn btn-primary">
        Update
        </button>

    </div>

</div>
</div>
</div>
</div>

`,

    data() {
        return {
            roomTypes: [],
            reservations: [],
            modalTitle: "",
            ReservationId: 0,
            roomType: "",
            DateOfReservation: "",
            PhotoFileName: "anonymous.png",
            PhotoPath: variables.PHOTO_URL
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "reservation")
                .then((response) => {
                    this.reservations = response.data;
                });

            axios.get(variables.API_URL + "roomType")
                .then((response) => {
                    this.roomTypess = response.data;
                });
        },
        addClick() {
            this.modalTitle = "Add Reservation";
            this.ReservationId = 0;
            this.RoomType = "",
                this.DateOfReservation = "",
                this.PhotoFileName = "anonymous.png"
        },
        editClick(emp) {
            this.modalTitle = "Edit Employee";
            this.ReservationId = emp.ReservationId;
            this.RoomType = emp.RoomType,
                this.DateOfReservation = emp.DateOfReservation,
                this.PhotoFileName = emp.PhotoFileName
        },
        createClick() {
            axios.post(variables.API_URL + "reservation", {
                RoomType: this.RoomType,
                DateOfReservation: this.DateOfReservation,
                PhotoFileName: this.PhotoFileName
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios.put(variables.API_URL + "reservation", {
                ReservationId: this.ReservationId,
                RoomType: this.RoomType,
                DateOfReservation: this.DateOfReservation,
                PhotoFileName: this.PhotoFileName
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm("Are you sure?")) {
                return;
            }
            axios.delete(variables.API_URL + "reservation/" + id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });

        },
        imageUpload(event) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            axios.post(
                variables.API_URL + "reservation/savefile",
                formData)
                .then((response) => {
                    this.PhotoFileName = response.data;
                });
        }

    },
    mounted: function () {
        this.refreshData();
    }

}