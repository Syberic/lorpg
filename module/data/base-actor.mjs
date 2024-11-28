import lorpgDataModel from "./base-model.mjs";

export default class lorpgActorBase extends lorpgDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};
  
    schema.health = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 40 })
    });

    schema.stagger = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 30, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 30 })
    });

    schema.sanity = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: -9, max: 9 }),
    });

    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}