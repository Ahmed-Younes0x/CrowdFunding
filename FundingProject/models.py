from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from django.urls import reverse
from Login.models import Custom_User

# member 3 start
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, default='Folder')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    STATUS_CHOICES = [
        ('active', 'active'),
        ('completed', 'completed'),
        ('cancelled', 'cancelled'),
    ]

    title = models.CharField(max_length=200)
    details = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    total_target = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    owner = models.ForeignKey(Custom_User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('project_detail', kwargs={'pk': self.pk})

    @property
    def progress_percentage(self):
        if self.total_target > 0:
            return min((float(self.current_amount) / float(self.total_target)) * 100, 100)
        return 0

    @property
    def days_left(self):
        from datetime import date
        if self.end_date > date.today():
            return (self.end_date - date.today()).days
        return 0

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/')
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"صورة {self.project.title}"

class ProjectTag(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    tag = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['project', 'tag']

    def __str__(self):
        return f"#{self.tag}"
# member 3 end
# 
class Donation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, 
                              related_name='donations')
    donor = models.ForeignKey(Custom_User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.get_full_name()} - {self.amount} egp"

    @classmethod
    def create(cls, amount, user, project):
        if not amount or amount <= 0:
            raise ValueError("Donation amount must be positive")
        if not user:
            raise ValueError("Donor user is required")
        if not project:
            raise ValueError("Target project is required")
            
        donation = cls(
            amount=amount,
            donor=user,
            project=project
        )
        donation.save()
        return donation

    @classmethod
    def get(cls, user=None, project=None):
        if user and project:
            return cls.objects.filter(donor=user, project=project)
        elif user:
            return cls.objects.filter(donor=user)
        elif project:
            return cls.objects.filter(project=project)
        else:
            raise ValueError("Either user or project must be provided")

# member 4 start
class Comment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(Custom_User, on_delete=models.CASCADE)
    content = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"comnt {self.user.get_full_name()} on {self.project.title}"

class Rating(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(Custom_User, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.rating} star"
# member 4 end
class Report(models.Model):
    TARGET_CHOICES = [
        ('project', 'project'),
        ('comment', 'comment'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'pending'),
        ('reviewed', 'reviewed'),
        ('resolved', 'resolved'),
    ]

    reporter = models.ForeignKey(Custom_User, on_delete=models.CASCADE)
    target_id = models.PositiveIntegerField()
    target_type = models.CharField(max_length=20, choices=TARGET_CHOICES)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"from {self.reporter.get_full_name()}"