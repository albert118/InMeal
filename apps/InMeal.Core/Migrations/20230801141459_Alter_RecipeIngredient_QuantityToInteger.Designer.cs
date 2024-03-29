﻿// <auto-generated />
using System;
using InMeal.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InMeal.Core.Migrations
{
    [DbContext(typeof(InMealDbMigrationContext))]
    [Migration("20230801141459_Alter_RecipeIngredient_QuantityToInteger")]
    partial class Alter_RecipeIngredient_QuantityToInteger
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("InMeal.Core.Mementos.IngredientMemento", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<bool>("IsArchived")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Ingredient", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeCategoryMemento", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<Guid>("RecipeId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId", "Category")
                        .IsUnique();

                    b.ToTable("RecipeCategory", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeIngredientMemento", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("IngredientId")
                        .HasColumnType("char(36)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<Guid>("RecipeId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("IngredientId");

                    b.HasIndex("RecipeId");

                    b.ToTable("RecipeIngredient", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeMemento", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Blurb")
                        .HasColumnType("longtext");

                    b.Property<Guid?>("CategoryId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("CookTime")
                        .HasColumnType("int");

                    b.Property<string>("CourseType")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("longtext")
                        .HasDefaultValue("Unknown");

                    b.Property<bool>("IsArchived")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("MealType")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("longtext")
                        .HasDefaultValue("Unknown");

                    b.Property<int?>("PrepTime")
                        .HasColumnType("int");

                    b.Property<string>("PreparationSteps")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Servings")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Recipe", (string)null);
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeIngredientMemento", b =>
                {
                    b.HasOne("InMeal.Core.Mementos.IngredientMemento", "Ingredient")
                        .WithMany()
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InMeal.Core.Mementos.RecipeMemento", "Recipe")
                        .WithMany("RecipeIngredients")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingredient");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeMemento", b =>
                {
                    b.HasOne("InMeal.Core.Mementos.RecipeCategoryMemento", "Category")
                        .WithMany("Recipes")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeCategoryMemento", b =>
                {
                    b.Navigation("Recipes");
                });

            modelBuilder.Entity("InMeal.Core.Mementos.RecipeMemento", b =>
                {
                    b.Navigation("RecipeIngredients");
                });
#pragma warning restore 612, 618
        }
    }
}
