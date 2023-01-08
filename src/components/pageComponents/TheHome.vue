<template>
  <v-container fluid>
    <div class="text-center">
      <v-dialog transition="dialog-bottom-transition" max-width="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">Add</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-container fluid
              > <v-card-text v-if="error" class="red--text font-weight-medium text-center" >enter field</v-card-text>
             
              
              <v-form v-model="valid">
                <v-text-field
                  v-model="title"
                  label="Title"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="describe"
                  label="Describe"
                  required
                ></v-text-field> </v-form
            ></v-container>
            <v-card-actions class="justify-end">
              <v-btn text @click="addData">Add</v-btn>
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Title</th>
            <th class="text-left">Describe</th>
            <th class="text-left">Delete</th>
            <th class="text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.describe }}</td>
            <td>
              <v-btn depressed @click="deleteTitle(item.id)" color="error">
                Delete
              </v-btn>
            </td>
            <td>
              <div class="text-left">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="success darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Edit
                    </v-btn>
                  </template>

                  <v-card>
                    <v-container fluid
                      ><v-form>
                        <v-text-field
                          v-model="editTitle"
                          label="Title"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="editDescribe"
                          label="Describe"
                          required
                        ></v-text-field> </v-form
                    ></v-container>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="success darken-2" @click="editData(item.id)">
                        Edit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      desserts: [],
      dialog: false,
      title: "",
      describe: "",
      editTitle:'',
      editDescribe:'',
      error: false,

    };
  },
  methods: {
    addData() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("describe", this.describe);
      axios
        .post("http://localhost:8000/task/", formData, {})
        .then((res) => {
          console.log(res);
          this.error = false
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          if(err){
            this.error = true

          }
        });
    },
     editData(row) {
      const editData = new FormData();
      editData.append("title", this.editTitle);
      editData.append("describe", this.editDescribe);
      axios
        .patch(`http://localhost:8000/task/${row}/`, editData, {})
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTitle(id) {
      axios
        .delete(`http://localhost:8000/task/` + id, {})
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
  },
  created() {
    axios
      .get(`http://localhost:8000/task/`, {})
      .then((response) => {
        console.log(response.data);
        this.desserts = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
