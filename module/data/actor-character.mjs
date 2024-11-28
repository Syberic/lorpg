import lorpgActorBase from "./base-actor.mjs";

export default class lorpgCharacter extends lorpgActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.skills = new fields.SchemaField(Object.keys(CONFIG.LORPG.skills).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    for (const key in this.skills) {
      this.skills[key].label = game.i18n.localize(CONFIG.LORPG.skills[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.skills) {
      for (let [k,v] of Object.entries(this.skills)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // data.lvl = this.attributes.level.value;

    return data
  }
}