from rest_framework import serializers


class RootsEntitySerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = self.context["request"].user
        validated_data.update(
            {
                "created_by": user if user.is_authenticated else None,
                "modified_by": user if user.is_authenticated else None,
            }
        )

        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context["request"].user
        validated_data.update({"modified_by": user if user.is_authenticated else None})

        return super().update(instance, validated_data)
