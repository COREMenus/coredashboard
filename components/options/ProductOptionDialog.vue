<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="dialog">
      <v-card-title>
        {{ mode === 'edit' ? $t('edit_option') : $t('new_option') }}
      </v-card-title>
      <v-card-text>
        <v-tabs v-model="tab" grow>
          <v-tab>{{ $t('general') }}</v-tab>
          <v-tab>{{ $t('translation') }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
        <!-- * General -->
          <v-tab-item>
            <v-container>
                <v-text-field
              v-model="name"
              dense
              outlined
              :label="$t('name')"
            ></v-text-field>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="price"
                  prepend-inner-icon="mdi-cash"
                  dense
                  outlined
                  :label="$t('price')"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="calories"
                  prepend-inner-icon="mdi-fire"
                  dense
                  outlined
                  :label="$t('calories')"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            </v-container>
          </v-tab-item>

          <v-tab-item>
            <OptionTranslation></OptionTranslation>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false"> {{ $t('cancel') }} </v-btn>
        <v-btn color="green" dark @click="save">
          {{ $t('save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import OptionTranslation from './OptionTranslation.vue'

const { mapFields } = createHelpers({
  getterType: 'option/getField',
  mutationType: 'option/updateField',
})

export default {
        components: { OptionTranslation },
    // eslint-disable-next-line vue/require-prop-types
    props: ["mode"],
    data() {
        return {
            dialog: false,
            tab: 0
        };
    },
    computed: {
        ...mapState("product", ["editProduct"]),
        ...mapState("option", ["editOption", "editTranslations"]),
        ...mapFields([
            "editOption.name",
            "editOption.calories",
            "editOption.price",
        ]),
    },
    methods: {
        ...mapMutations("option", ["addOption", "setOption"]),
        async save() {
            try {
                // Edit
                if (this.mode === "edit") {
                    const res = await this.$axios.put("/api/products/options/" + this.editOption.id, this.editOption);
                    this.setOption(res.data);
                }
                // Create
                else if (this.editProduct.id) {
                    const res = await this.$axios.post(`/api/products/options/${this.editProduct.id}`, {
                        ...this.editOption,
                        product_option_translations: this.editTranslations
                    });
                    this.addOption(res.data);
                }
                else {
                    this.addOption(this.editOption);
                }
                this.$toast.success(this.$t("saved"));
                this.dialog = false;
            }
            catch (error) {
                this.$toast.error(this.$t("error_occured"));
            }
        },
    },
}
</script>

<style></style>
